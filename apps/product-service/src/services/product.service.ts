import { InsertProduct, Product } from '@/db/schemas/products';
import { productRepository } from '@/repositories/product.repository';
import { logger } from '@/utils/logger';
import { ServiceResponse } from '@repo/server/lib/service-response';
import { StatusCodes } from 'http-status-codes';
import { productCategoryRepository } from '@/repositories/product-category.repository';
import { ProductCategory, InsertProductCategory } from '@/db/schemas';

class ProductService {
  constructor(
    private readonly productRepo = productRepository,
    private readonly categoryRepo = productCategoryRepository
  ) {}

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

  public async deleteAllProductCategories(): Promise<ServiceResponse<ProductCategory[] | null>> {
    try {
      const deletedCategories = await this.categoryRepo.deleteAllCategories();
      return ServiceResponse.success('All product categories deleted successfully', deletedCategories, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error deleting all product categories: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteProductCategory(categoryId: string): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.getCategoryById(categoryId);

      if (!category) {
        return ServiceResponse.failure('Product category not found', null, StatusCodes.NOT_FOUND);
      }

      const deletedCategory = await this.categoryRepo.deleteCategory(categoryId);
      return ServiceResponse.success('Product category deleted successfully', deletedCategory, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error deleting product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateProductCategory(
    categoryId: string,
    data: Partial<InsertProductCategory>
  ): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.getCategoryById(categoryId);

      if (!category) {
        return ServiceResponse.failure('Product category not found', null, StatusCodes.NOT_FOUND);
      }

      const updatedCategory = await this.categoryRepo.updateCategory(categoryId, data);
      return ServiceResponse.success('Product category updated successfully', updatedCategory, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error updating product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async createProductCategory(data: InsertProductCategory): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.createCategory(data);
      return ServiceResponse.success('Product category created successfully', category, StatusCodes.CREATED);
    } catch (error) {
      const errorMessage = `Error creating product category: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAllProductCategories(): Promise<ServiceResponse<ProductCategory[] | null>> {
    try {
      const categories = await this.categoryRepo.getAllCategories();
      return ServiceResponse.success('Product categories retrieved successfully', categories, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error fetching product categories: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Failed to fetch product categories', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async getProductCategory(categoryId: string): Promise<ServiceResponse<ProductCategory | null>> {
    try {
      const category = await this.categoryRepo.getCategoryById(categoryId);

      if (!category) {
        return ServiceResponse.failure('Product category not found', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('Product category retrieved successfully', category, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error fetching product category: ${(error as Error).message}`;
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

  public async deleteProduct(productId: string, vendorId: string): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepo.getProductById(productId);

      if (!product) {
        return ServiceResponse.failure('Product not found', null, StatusCodes.NOT_FOUND);
      }

      if (product.vendorId !== vendorId) {
        return ServiceResponse.failure('Unauthorized to delete this product', null, StatusCodes.FORBIDDEN);
      }

      const deletedProduct = await this.productRepo.deleteProduct(productId);
      return ServiceResponse.success('Product deleted successfully', deletedProduct, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error deleting product: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

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
}

export const productService = new ProductService();
