# Error Handling Examples

This document provides comprehensive examples of using both `handleServiceError` and `executeWithErrorHandling` functions.

## 🔧 **Traditional Approach vs New Utility**

### Option 1: Using `handleServiceError` directly (Current Pattern)

```typescript
public async createProduct(data: CreateProduct): Promise<ServiceResponse<Product | null>> {
  try {
    const product = await this.productRepo.createProduct(data);
    return ServiceResponse.success('Product created successfully', product, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    return handleServiceError({
      errorEvent: 'createProduct',
      error: error as Error,
      logger,
    });
  }
}
```

### Option 2: Using `executeWithErrorHandling` utility (Cleaner Pattern)

```typescript
public async createProduct(data: CreateProduct): Promise<ServiceResponse<Product | null>> {
  return executeWithErrorHandling('createProduct', async () => {
    const product = await this.productRepo.createProduct(data);
    return ServiceResponse.success('Product created successfully', product, HTTP_STATUS_CODES.CREATED);
  }, logger);
}
```

---

## 📚 **Comprehensive Examples**

### 1. **Simple CRUD Operations**

```typescript
// GET by ID
public async getUserById(id: string): Promise<ServiceResponse<User | null>> {
  return executeWithErrorHandling('getUserById', async () => {
    const user = await this.userRepo.findById(id);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }
    return ServiceResponse.success('User retrieved successfully', user, HTTP_STATUS_CODES.OK);
  }, logger);
}

// CREATE
public async createCategory(data: CreateCategoryInput): Promise<ServiceResponse<Category | null>> {
  return executeWithErrorHandling('createCategory', async () => {
    const category = await this.categoryRepo.create(data);
    return ServiceResponse.success('Category created successfully', category, HTTP_STATUS_CODES.CREATED);
  }, logger);
}

// UPDATE
public async updateUser(id: string, data: UpdateUserInput): Promise<ServiceResponse<User | null>> {
  return executeWithErrorHandling('updateUser', async () => {
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const updatedUser = await this.userRepo.update(id, data);
    return ServiceResponse.success('User updated successfully', updatedUser, HTTP_STATUS_CODES.OK);
  }, logger);
}

// DELETE
public async deleteProduct(id: string): Promise<ServiceResponse<null>> {
  return executeWithErrorHandling('deleteProduct', async () => {
    const product = await this.productRepo.findById(id);
    if (!product) {
      return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    await this.productRepo.delete(id);
    return ServiceResponse.success('Product deleted successfully', null, HTTP_STATUS_CODES.OK);
  }, logger);
}
```

### 2. **Complex Business Logic**

```typescript
// E-commerce Order Processing
public async processCheckout(checkoutData: CheckoutInput): Promise<ServiceResponse<Order | null>> {
  return executeWithErrorHandling('processCheckout', async () => {
    // Step 1: Validate cart
    const cart = await this.cartService.getCart(checkoutData.cartId);
    if (!cart.success || !cart.data) {
      return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    // Step 2: Check inventory
    const inventoryCheck = await this.inventoryService.validateAvailability(cart.data.items);
    if (!inventoryCheck.success) {
      return ServiceResponse.failure('Some items are out of stock', null, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    // Step 3: Calculate taxes and shipping
    const calculations = await this.calculationService.calculateTotals(cart.data, checkoutData.address);

    // Step 4: Process payment
    const payment = await this.paymentService.charge({
      amount: calculations.total,
      paymentMethod: checkoutData.paymentMethod
    });

    if (!payment.success) {
      return ServiceResponse.failure('Payment failed', null, HTTP_STATUS_CODES.PAYMENT_REQUIRED);
    }

    // Step 5: Create order
    const order = await this.orderRepo.create({
      userId: checkoutData.userId,
      items: cart.data.items,
      paymentId: payment.data.id,
      ...calculations
    });

    // Step 6: Clear cart
    await this.cartService.clearCart(checkoutData.cartId);

    return ServiceResponse.success('Order processed successfully', order, HTTP_STATUS_CODES.CREATED);
  }, logger);
}
```

### 3. **Data Aggregation & Analytics**

```typescript
// Dashboard Statistics
public async getDashboardStats(vendorId: string): Promise<ServiceResponse<DashboardStats | null>> {
  return executeWithErrorHandling('getDashboardStats', async () => {
    const [
      totalOrders,
      totalRevenue,
      topProducts,
      recentActivity
    ] = await Promise.all([
      this.orderRepo.getTotalOrdersForVendor(vendorId),
      this.orderRepo.getTotalRevenueForVendor(vendorId),
      this.productRepo.getTopSellingProducts(vendorId, 10),
      this.activityRepo.getRecentActivity(vendorId, 20)
    ]);

    const stats: DashboardStats = {
      totalOrders,
      totalRevenue,
      topProducts,
      recentActivity,
      generatedAt: new Date()
    };

    return ServiceResponse.success('Dashboard stats retrieved successfully', stats, HTTP_STATUS_CODES.OK);
  }, logger);
}
```

### 4. **File Upload & Processing**

```typescript
// Image Upload with Processing
public async uploadProductImage(productId: string, file: Express.Multer.File): Promise<ServiceResponse<ProductImage | null>> {
  return executeWithErrorHandling('uploadProductImage', async () => {
    // Validate product exists
    const product = await this.productRepo.findById(productId);
    if (!product) {
      return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      return ServiceResponse.failure('Invalid file type', null, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    // Upload to cloud storage
    const uploadResult = await this.storageService.upload(file, `products/${productId}`);

    // Create thumbnail
    const thumbnailResult = await this.imageService.createThumbnail(uploadResult.url);

    // Save to database
    const productImage = await this.productImageRepo.create({
      productId,
      originalUrl: uploadResult.url,
      thumbnailUrl: thumbnailResult.url,
      size: file.size,
      mimeType: file.mimetype
    });

    return ServiceResponse.success('Image uploaded successfully', productImage, HTTP_STATUS_CODES.CREATED);
  }, logger);
}
```

### 5. **External API Integration**

```typescript
// Send Email Notification
public async sendWelcomeEmail(userId: string): Promise<ServiceResponse<null>> {
  return executeWithErrorHandling('sendWelcomeEmail', async () => {
    // Get user details
    const user = await this.userRepo.findById(userId);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    // Prepare email content
    const emailTemplate = await this.templateService.getTemplate('welcome');
    const emailContent = this.templateService.render(emailTemplate, { user });

    // Send email via external service
    await this.emailService.send({
      to: user.email,
      subject: 'Welcome to our platform!',
      html: emailContent
    });

    // Log notification
    await this.notificationRepo.create({
      userId,
      type: 'welcome_email',
      sentAt: new Date()
    });

    return ServiceResponse.success('Welcome email sent successfully', null, HTTP_STATUS_CODES.OK);
  }, logger);
}
```

### 6. **Batch Operations**

```typescript
// Bulk Product Import
public async importProducts(products: ImportProductInput[]): Promise<ServiceResponse<ImportResult | null>> {
  return executeWithErrorHandling('importProducts', async () => {
    const results: ImportResult = {
      successful: [],
      failed: [],
      total: products.length
    };

    for (const productData of products) {
      try {
        // Validate product data
        const validation = await this.validationService.validateProduct(productData);
        if (!validation.isValid) {
          results.failed.push({
            product: productData,
            errors: validation.errors
          });
          continue;
        }

        // Create product
        const product = await this.productRepo.create(productData);
        results.successful.push(product);

      } catch (error) {
        results.failed.push({
          product: productData,
          errors: [(error as Error).message]
        });
      }
    }

    const message = `Import completed: ${results.successful.length} successful, ${results.failed.length} failed`;
    return ServiceResponse.success(message, results, HTTP_STATUS_CODES.OK);
  }, logger);
}
```

### 7. **Search & Filtering**

```typescript
// Advanced Product Search
public async searchProducts(criteria: SearchCriteria): Promise<ServiceResponse<SearchResult<Product> | null>> {
  return executeWithErrorHandling('searchProducts', async () => {
    // Build search query
    const searchQuery = this.searchService.buildQuery(criteria);

    // Execute search
    const [products, facets, total] = await Promise.all([
      this.productRepo.search(searchQuery),
      this.searchService.getFacets(criteria),
      this.productRepo.getSearchCount(searchQuery)
    ]);

    const result: SearchResult<Product> = {
      items: products,
      facets,
      pagination: {
        page: criteria.page || 1,
        limit: criteria.limit || 20,
        total,
        totalPages: Math.ceil(total / (criteria.limit || 20))
      },
      query: criteria.query
    };

    return ServiceResponse.success('Search completed successfully', result, HTTP_STATUS_CODES.OK);
  }, logger);
}
```

---

## 🎯 **When to Use Which Pattern**

### Use `executeWithErrorHandling` when:

- ✅ You have clean, straightforward business logic
- ✅ You want minimal boilerplate code
- ✅ You don't need special error handling
- ✅ You prefer functional style

### Use `handleServiceError` directly when:

- ✅ You need special error handling (like JWT errors)
- ✅ You have complex catch logic
- ✅ You need different error responses for different error types
- ✅ You prefer explicit try/catch blocks

---

## 🚀 **Best Practices**

1. **Use descriptive method names** for the first parameter
2. **Keep business logic focused** within the operation function
3. **Return early** for validation failures
4. **Use Promise.all** for parallel operations when possible
5. **Consider the return type** - use the direct approach for non-null types if needed

Both patterns are valid and provide consistent error handling across your application! 🎉
