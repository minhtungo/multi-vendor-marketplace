import { InsertProduct, Product } from '@/db/schemas/products';
import { productRepository } from '@/repositories/product.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse } from '@repo/server/lib/service-response';
import { StatusCodes } from 'http-status-codes';

class ProductService {
  public async createProduct(data: InsertProduct, vendorId: string): Promise<ServiceResponse<Product | null>> {
    try {
      await productRepository.createProduct({
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
      const product = await productRepository.getProductById(productId);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, StatusCodes.NOT_FOUND);
      }

      if (product.vendorId !== vendorId) {
        return ServiceResponse.failure('Unauthorized to update this product', null, StatusCodes.FORBIDDEN);
      }

      await productRepository.updateProduct(productId, {
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
}

export const productService = new ProductService();
