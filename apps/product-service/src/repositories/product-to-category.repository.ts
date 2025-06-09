import { db } from '@/db';
import { categoriesToProducts } from '@/db/schemas/categories-to-products';

class ProductToCategoryRepository {
  constructor(private readonly dbInstance = db) {}

  public async createProductToCategory(productId: string, categoryId: string) {
    return this.dbInstance.insert(categoriesToProducts).values({ productId, categoryId }).onConflictDoNothing();
  }
}

export const productToCategoryRepository = new ProductToCategoryRepository();
