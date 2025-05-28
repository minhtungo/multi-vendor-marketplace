import { Product } from '@/db/schemas/products';
import { CreateProduct, GetProductQuery, UpdateProduct } from '@/models/product.model';
import { productRepository } from '@/repositories/product.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

class ProductService {
  constructor(private readonly productRepo = productRepository) {}

  public async getProduct(data: GetProductQuery): Promise<ServiceResponse<Product | null>> {
    console.log(data);
    try {
      const product = data.id
        ? await this.productRepo.getProductById(data.id)
        : await this.productRepo.getProductByHandle(data.handle!);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Product retrieved successfully', product, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
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
    try {
      const result = await this.productRepo.getPaginatedProducts(page, limit, vendorId, sort);

      return ServiceResponse.success(
        'Products retrieved successfully',
        {
          products: result.items,
          count: result.total,
        },
        HTTP_STATUS_CODES.OK
      );
    } catch (error) {
      const errorMessage = `Error fetching products: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async createProduct(data: CreateProduct, vendorId: string): Promise<ServiceResponse<Product | null>> {
    try {
      await this.productRepo.createProduct({
        ...data,
        price: data.price.toString(),
        compareAtPrice: data.compareAtPrice?.toString(),
        vendorId,
      });

      return ServiceResponse.success('Product created successfully', null, HTTP_STATUS_CODES.CREATED);
    } catch (error) {
      const errorMessage = `Error creating product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateProduct(
    productId: string,
    data: UpdateProduct,
    vendorId: string
  ): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepo.getProductById(productId);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      if (product.vendorId !== vendorId) {
        return ServiceResponse.failure('Unauthorized to update this product', null, HTTP_STATUS_CODES.FORBIDDEN);
      }

      await this.productRepo.updateProduct(productId, {
        ...data,
        price: data.price?.toString(),
        compareAtPrice: data.compareAtPrice?.toString(),
        updatedAt: new Date(),
      });

      return ServiceResponse.success('Product updated successfully', null, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error updating product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteAllProducts(vendorId: string): Promise<ServiceResponse<Product[] | null>> {
    try {
      const deletedProducts = await this.productRepo.deleteAllProducts(vendorId);
      return ServiceResponse.success('All products deleted successfully', deletedProducts, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error deleting all products: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteProduct(productId: string, vendorId: string): Promise<ServiceResponse<null>> {
    try {
      const product = await this.productRepo.getProductById(productId);
      console.log('vendorId', vendorId);
      console.log(product);
      if (!product) {
        return ServiceResponse.failure('Product not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      if (product.vendorId !== vendorId) {
        return ServiceResponse.failure('Unauthorized to delete this product', null, HTTP_STATUS_CODES.FORBIDDEN);
      }
      await this.productRepo.deleteProduct(productId);
      return ServiceResponse.success('Product deleted successfully', null, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error deleting product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const productService = new ProductService();
