import { db } from '@/db';
import { productCategories, type InsertProductCategory } from '@/db/schemas/product-categories';
import { eq } from 'drizzle-orm';

export class ProductCategoryRepository {
  constructor(private readonly dbInstance = db) {}

  public async getAllCategories(trx: typeof db = this.dbInstance) {
    return this.dbInstance.query.productCategories.findMany({
      where: (categories) => eq(categories.isActive, true),
      orderBy: (categories) => categories.name,
    });
  }

  public async createCategory(category: InsertProductCategory, trx: typeof db = this.dbInstance) {
    const [newCategory] = await trx
      .insert(productCategories)
      .values({ ...category })
      .returning();

    return newCategory;
  }

  public async getCategoryById(categoryId: string, trx: typeof db = this.dbInstance) {
    return this.dbInstance.query.productCategories.findFirst({
      where: eq(productCategories.id, categoryId),
    });
  }

  public async updateCategory(
    categoryId: string,
    category: Partial<InsertProductCategory>,
    trx: typeof db = this.dbInstance
  ) {
    const [updatedCategory] = await trx
      .update(productCategories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(productCategories.id, categoryId))
      .returning();

    return updatedCategory;
  }

  public async deleteCategory(categoryId: string, trx: typeof db = this.dbInstance) {
    const [deletedCategory] = await trx
      .delete(productCategories)
      .where(eq(productCategories.id, categoryId))
      .returning();

    return deletedCategory;
  }

  public async deleteAllCategories(trx: typeof db = this.dbInstance) {
    const deletedCategories = await trx.delete(productCategories).returning();

    return deletedCategories;
  }
}

export const productCategoryRepository = new ProductCategoryRepository();
