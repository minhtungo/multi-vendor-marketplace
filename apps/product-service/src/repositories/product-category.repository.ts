import { db } from '@/db';
import { categories, type InsertCategory } from '@/db/schemas/categories';
import { eq } from 'drizzle-orm';

export class ProductCategoryRepository {
  constructor(private readonly dbInstance = db) {}

  public async getAllCategories(trx: typeof db = this.dbInstance) {
    return this.dbInstance.query.categories.findMany({
      orderBy: (categories) => categories.name,
    });
  }

  public async createCategory(category: InsertCategory, trx: typeof db = this.dbInstance) {
    const [newCategory] = await trx
      .insert(categories)
      .values({ ...category })
      .returning();

    return newCategory;
  }

  public async getCategoryById(categoryId: string, trx: typeof db = this.dbInstance) {
    return this.dbInstance.query.categories.findFirst({
      where: eq(categories.id, categoryId),
    });
  }

  public async updateCategory(categoryId: string, category: Partial<InsertCategory>, trx: typeof db = this.dbInstance) {
    const [updatedCategory] = await trx
      .update(categories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(categories.id, categoryId))
      .returning();

    return updatedCategory;
  }

  public async deleteCategory(categoryId: string, trx: typeof db = this.dbInstance) {
    const [deletedCategory] = await trx.delete(categories).where(eq(categories.id, categoryId)).returning();

    return deletedCategory;
  }

  public async deleteAllCategories(trx: typeof db = this.dbInstance) {
    const deletedCategories = await trx.delete(categories).returning();

    return deletedCategories;
  }
}

export const productCategoryRepository = new ProductCategoryRepository();
