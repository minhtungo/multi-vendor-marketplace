import { db } from '@/db';
import { type InsertProduct, products } from '@/db/schemas/products';
import { eq, sql, count } from 'drizzle-orm';

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

  public async deleteAllProducts(vendorId: string, trx: typeof db = this.dbInstance) {
    const deletedProducts = await trx.delete(products).where(eq(products.vendorId, vendorId)).returning();

    return deletedProducts;
  }

  public async deleteProduct(productId: string, trx: typeof db = this.dbInstance) {
    const [deletedProduct] = await trx.delete(products).where(eq(products.id, productId)).returning();

    return deletedProduct;
  }

  public async getPaginatedProducts(page: number, limit: number, trx: typeof db = this.dbInstance) {
    const offset = (page - 1) * limit;

    const [{ value: total }] = await trx.select({ value: count() }).from(products);

    const items = await trx.select().from(products).limit(limit).offset(offset).orderBy(products.createdAt);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export const productRepository = new ProductRepository();
