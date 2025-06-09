import { parseCsvFromBuffer } from '@/configs/csv';
import { CreateProductRequest, GetProductQuery, Product, UpdateProductRequest } from '@/models/product.model';
import { productToCategoryRepository } from '@/repositories/product-to-category.repository';
import { productRepository } from '@/repositories/product.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/shared-server/lib';

class ProductService {
  constructor(
    private readonly productRepo = productRepository,
    private readonly productToCategoryRepo = productToCategoryRepository
  ) {}

  public async getProduct(data: GetProductQuery): Promise<ServiceResponse<Product | null>> {
    return executeWithErrorHandling(
      'getProduct',
      async () => {
        const product = data.id
          ? await this.productRepo.getProductById(data.id)
          : await this.productRepo.getProductByHandle(data.handle!);

        if (!product) {
          return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        return ServiceResponse.success('Product retrieved successfully', product, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async getAllProducts(
    page: number,
    limit: number,
    vendorId?: string,
    sort?: 'price_asc' | 'price_desc' | 'latest_desc' | 'latest_asc'
  ): Promise<
    ServiceResponse<{
      products: Product[];
      count: number;
    } | null>
  > {
    return executeWithErrorHandling(
      'getAllProducts',
      async () => {
        const result = await this.productRepo.getPaginatedProducts(page, limit, vendorId, sort);

        return ServiceResponse.success(
          'Products retrieved successfully',
          {
            products: result.items,
            count: result.total,
          },
          HTTP_STATUS_CODES.OK
        );
      },
      logger
    );
  }

  public async createProduct(data: CreateProductRequest, vendorId: string): Promise<ServiceResponse<Product | null>> {
    return executeWithErrorHandling(
      'createProduct',
      async () => {
        const { categories, ...productData } = data;

        const product = await this.productRepo.createProduct({
          ...productData,
          price: productData.price.toString(),
          compareAtPrice: productData.compareAtPrice?.toString(),
          vendorId,
          stock: 0,
        });

        if (categories) {
          const promises = categories.map((category) =>
            this.productToCategoryRepo.createProductToCategory(product.id, category)
          );
          await Promise.all(promises);
        }

        return ServiceResponse.success('Product created successfully', null, HTTP_STATUS_CODES.CREATED);
      },
      logger
    );
  }

  public async updateProduct(
    productId: string,
    data: UpdateProductRequest,
    vendorId: string
  ): Promise<ServiceResponse<Product | null>> {
    return executeWithErrorHandling(
      'updateProduct',
      async () => {
        const product = await this.productRepo.getProductById(productId);

        if (!product) {
          return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        if (product.vendorId !== vendorId) {
          return ServiceResponse.failure('Unauthorized to update this product', null, HTTP_STATUS_CODES.FORBIDDEN);
        }

        const updatedProduct = await this.productRepo.updateProduct(productId, {
          ...data,
          price: data.price?.toString(),
          compareAtPrice: data.compareAtPrice?.toString(),
          updatedAt: new Date(),
        });

        if (data.categories) {
          const promises = data.categories.map((category) =>
            this.productToCategoryRepo.createProductToCategory(productId, category)
          );
          await Promise.all(promises);
        }

        return ServiceResponse.success('Product updated successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async deleteAllProducts(vendorId: string): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'deleteAllProducts',
      async () => {
        await this.productRepo.deleteAllProducts(vendorId);
        return ServiceResponse.success('All products deleted successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async deleteProduct(productId: string, vendorId: string): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'deleteProduct',
      async () => {
        const product = await this.productRepo.getProductById(productId);

        if (!product) {
          return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        if (product.vendorId !== vendorId) {
          return ServiceResponse.failure('Unauthorized to delete this product', null, HTTP_STATUS_CODES.FORBIDDEN);
        }
        await this.productRepo.deleteProduct(productId);
        return ServiceResponse.success('Product deleted successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async importProductsFromCsv(file: Express.Multer.File, vendorId: string) {
    return executeWithErrorHandling(
      'importProductsFromCsv',
      async () => {
        if (!file) {
          return ServiceResponse.failure('CSV file is required', null, HTTP_STATUS_CODES.BAD_REQUEST);
        }

        const csvData = await parseCsvFromBuffer(file.buffer);

        if (csvData.length === 0) {
          return ServiceResponse.failure('CSV file is empty or invalid', null, HTTP_STATUS_CODES.BAD_REQUEST);
        }

        let successfulProductsCount = 0;

        const productPromises = csvData.map(async (row, index) => {
          try {
            const productData = {
              name: row.name,
              description: row.description || null,
              price: row.price?.toString() || '0',
              compareAtPrice: row.compare_at_price?.toString() || null,
              stock: parseInt(row.stock) || 0,
              status: (row.status as 'published' | 'draft') || 'draft',
              type: (row.type as 'physical' | 'digital') || 'physical',
              images: Array.isArray(row.images) ? row.images : [],
              tags: Array.isArray(row.tags) ? row.tags : [],
              sku: row.sku || `SKU-${Date.now()}-${index}`,
              handle:
                row.handle ||
                row.name
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, ''),
              vendorId: vendorId,
            };

            return await this.productRepo.createProduct(productData);
          } catch (error) {
            logger.error(`Failed to process row ${index}:`, error);
            return null;
          }
        });

        const productResults = await Promise.all(productPromises);
        const successfulProducts = productResults.filter((result) => result !== null);
        const failedProductsCount = productResults.length - successfulProducts.length;

        if (failedProductsCount > 0) {
          logger.warn(`Failed to create ${failedProductsCount} products out of ${csvData.length}`);
        }

        return ServiceResponse.success(
          `Products imported successfully. Created ${successfulProducts.length} products from CSV`,
          { successfulProductsCount, totalRows: csvData.length },
          HTTP_STATUS_CODES.CREATED
        );
      },
      logger
    );
  }
}

export const productService = new ProductService();
