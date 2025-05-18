import { InsertProduct, Product } from '@/db/schemas/products';
import { productRepository } from '@/repositories/product.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse } from '@repo/server/lib/service-response';
import { StatusCodes } from 'http-status-codes';

class ProductService {
  constructor(private readonly productRepo = productRepository) {}

  public async getProduct(productId: string): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepo.getProductById(productId);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('Product retrieved successfully', product, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error fetching product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAllProducts(
    page: number,
    limit: number
  ): Promise<
    ServiceResponse<{
      products: Product[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    } | null>
  > {
    try {
      const result = await this.productRepo.getPaginatedProducts(page, limit);

      return ServiceResponse.success(
        'Products retrieved successfully',
        {
          products: result.items,
          pagination: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
          },
        },
        StatusCodes.OK
      );
    } catch (error) {
      const errorMessage = `Error fetching products: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async createProduct(data: InsertProduct, vendorId: string): Promise<ServiceResponse<Product | null>> {
    try {
      await this.productRepo.createProduct({
        ...data,
        vendorId,
      });

      return ServiceResponse.success('Product created successfully', null, StatusCodes.CREATED);
    } catch (error) {
      const errorMessage = `Error creating product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateProduct(
    productId: string,
    data: Partial<InsertProduct>,
    vendorId: string
  ): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepo.getProductById(productId);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, StatusCodes.NOT_FOUND);
      }

      if (product.vendorId !== vendorId) {
        return ServiceResponse.failure('Unauthorized to update this product', null, StatusCodes.FORBIDDEN);
      }

      await this.productRepo.updateProduct(productId, {
        ...data,
        updatedAt: new Date(),
      });

      return ServiceResponse.success('Product updated successfully', null, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error updating product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteAllProducts(vendorId: string): Promise<ServiceResponse<Product[] | null>> {
    try {
      const deletedProducts = await this.productRepo.deleteAllProducts(vendorId);
      return ServiceResponse.success('All products deleted successfully', deletedProducts, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error deleting all products: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteProduct(productId: string, vendorId: string): Promise<ServiceResponse<null>> {
    try {
      const product = await this.productRepo.getProductById(productId);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, StatusCodes.NOT_FOUND);
      }

      if (product.vendorId !== vendorId) {
        return ServiceResponse.failure('Unauthorized to delete this product', null, StatusCodes.FORBIDDEN);
      }
      await this.productRepo.deleteProduct(productId);
      return ServiceResponse.success('Product deleted successfully', null, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error deleting product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const productService = new ProductService();
