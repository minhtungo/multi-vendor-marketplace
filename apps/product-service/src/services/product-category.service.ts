import { Category, InsertCategory } from '@/db/schemas';
import { productCategoryRepository } from '@/repositories/product-category.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse, executeWithErrorHandling } from '@repo/server/lib';
import { HTTP_STATUS_CODES } from '@repo/server/core';

class ProductCategoryService {
  constructor(private readonly categoryRepo = productCategoryRepository) {}

  public async getAllProductCategories(): Promise<ServiceResponse<Category[] | null>> {
    return executeWithErrorHandling(
      'getAllProductCategories',
      async () => {
        const categories = await this.categoryRepo.getAllCategories();
        return ServiceResponse.success('Product categories retrieved successfully', categories, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async getProductCategory(categoryId: string): Promise<ServiceResponse<Category | null>> {
    return executeWithErrorHandling(
      'getProductCategory',
      async () => {
        const category = await this.categoryRepo.getCategoryById(categoryId);

        if (!category) {
          return ServiceResponse.failure('Product category not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        return ServiceResponse.success('Product category retrieved successfully', category, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async createProductCategory(data: InsertCategory): Promise<ServiceResponse<Category | null>> {
    return executeWithErrorHandling(
      'createProductCategory',
      async () => {
        const category = await this.categoryRepo.createCategory(data);

        return ServiceResponse.success('Product category created successfully', category, HTTP_STATUS_CODES.CREATED);
      },
      logger
    );
  }

  public async updateProductCategory(
    categoryId: string,
    data: Partial<InsertCategory>
  ): Promise<ServiceResponse<Category | null>> {
    return executeWithErrorHandling(
      'updateProductCategory',
      async () => {
        const category = await this.categoryRepo.getCategoryById(categoryId);

        if (!category) {
          return ServiceResponse.failure('Product category not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        const updatedCategory = await this.categoryRepo.updateCategory(categoryId, data);
        return ServiceResponse.success('Product category updated successfully', updatedCategory, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async deleteAllProductCategories(): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'deleteAllProductCategories',
      async () => {
        await this.categoryRepo.deleteAllCategories();
        return ServiceResponse.success('All product categories deleted successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async deleteProductCategory(categoryId: string): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'deleteProductCategory',
      async () => {
        const category = await this.categoryRepo.getCategoryById(categoryId);

        if (!category) {
          return ServiceResponse.failure('Product category not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        await this.categoryRepo.deleteCategory(categoryId);
        return ServiceResponse.success('Product category deleted successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }
}

export const productCategoryService = new ProductCategoryService();
