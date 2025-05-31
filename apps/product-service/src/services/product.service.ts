import { Product } from '@/db/schemas/products';
import { CreateProduct, GetProductQuery, ProductResponse, UpdateProduct } from '@/models/product.model';
import { productCategoryRepository } from '@/repositories/product-category.repository';
import { productToCategoryRepository } from '@/repositories/product-to-category.repository';
import { productRepository } from '@/repositories/product.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/server/lib';

class ProductService {
  constructor(
    private readonly productRepo = productRepository,
    private readonly productToCategoryRepo = productToCategoryRepository
  ) {}

  public async getProduct(data: GetProductQuery): Promise<ServiceResponse<ProductResponse | null>> {
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

  public async createProduct(data: CreateProduct, vendorId: string): Promise<ServiceResponse<Product | null>> {
    return executeWithErrorHandling(
      'createProduct',
      async () => {
        const { categories, ...productData } = data;

        const product = await this.productRepo.createProduct({
          ...productData,
          price: productData.price.toString(),
          compareAtPrice: productData.compareAtPrice?.toString(),
          vendorId,
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
    data: UpdateProduct,
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

  public async deleteAllProducts(vendorId: string): Promise<ServiceResponse<Product[] | null>> {
    return executeWithErrorHandling(
      'deleteAllProducts',
      async () => {
        const deletedProducts = await this.productRepo.deleteAllProducts(vendorId);
        return ServiceResponse.success('All products deleted successfully', deletedProducts, HTTP_STATUS_CODES.OK);
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
}

export const productService = new ProductService();
