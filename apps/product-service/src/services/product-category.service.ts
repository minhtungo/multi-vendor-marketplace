import { ProductCategory, InsertProductCategory } from '@/db/schemas';
import { productCategoryRepository } from '@/repositories/product-category.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse } from '@repo/server/lib/service-response';
import { HTTP_STATUS_CODES } from '@repo/server/lib/http-status-codes';

class ProductCategoryService {
  constructor(private readonly categoryRepo = productCategoryRepository) {}

  public async getAllProductCategories(): Promise<ServiceResponse<ProductCategory[] | null>> {
    try {
      const categories = await this.categoryRepo.getAllCategories();
      return ServiceResponse.success('Product categories retrieved successfully', categories, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching product categories: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'Failed to fetch product categories',
        null,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getProductCategory(categoryId: string): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.getCategoryById(categoryId);

      if (!category) {
        return ServiceResponse.failure('Product category not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Product category retrieved successfully', category, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async createProductCategory(data: InsertProductCategory): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.createCategory(data);
      return ServiceResponse.success('Product category created successfully', category, HTTP_STATUS_CODES.CREATED);
    } catch (error) {
      const errorMessage = `Error creating product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateProductCategory(
    categoryId: string,
    data: Partial<InsertProductCategory>
  ): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.getCategoryById(categoryId);

      if (!category) {
        return ServiceResponse.failure('Product category not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      const updatedCategory = await this.categoryRepo.updateCategory(categoryId, data);
      return ServiceResponse.success('Product category updated successfully', updatedCategory, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error updating product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteAllProductCategories(): Promise<ServiceResponse<null>> {
    try {
      await this.categoryRepo.deleteAllCategories();
      return ServiceResponse.success('All product categories deleted successfully', null, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error deleting all product categories: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteProductCategory(categoryId: string): Promise<ServiceResponse<null>> {
    try {
      const category = await this.categoryRepo.getCategoryById(categoryId);

      if (!category) {
        return ServiceResponse.failure('Product category not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      await this.categoryRepo.deleteCategory(categoryId);
      return ServiceResponse.success('Product category deleted successfully', null, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error deleting product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const productCategoryService = new ProductCategoryService();
