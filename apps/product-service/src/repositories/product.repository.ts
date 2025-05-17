import { db } from '@/db';
import { type InsertProduct, products } from '@/db/schemas/products';
import { eq } from 'drizzle-orm';

export class ProductRepository {
  constructor(private readonly dbInstance = db) {}

  public async getProductById(productId: string, trx: typeof db = this.dbInstance) {
    return this.dbInstance.query.products.findFirst({
      where: eq(products.id, productId),
    });
  }

  public async createProduct(product: InsertProduct, trx: typeof db = this.dbInstance) {
    const [newProduct] = await trx
      .insert(products)
      .values({ ...product })
      .returning();

    return newProduct;
  }

  public async updateProduct(productId: string, product: Partial<InsertProduct>, trx: typeof db = this.dbInstance) {
    const [updatedProduct] = await trx
      .update(products)
      .set({ ...product })
      .where(eq(products.id, productId))
      .returning();

    return updatedProduct;
  }
}

export const productRepository = new ProductRepository();
