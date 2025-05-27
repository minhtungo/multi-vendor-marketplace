import { db } from '@/db';
import { type InsertProduct, products } from '@/db/schemas/products';
import { eq, sql, count, desc, and } from 'drizzle-orm';

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

  public async getPaginatedProducts(
    page: number,
    limit: number,
    vendorId?: string,
    sort?: 'price_asc' | 'price_desc' | 'latest_desc' | 'latest_asc',
    trx: typeof db = this.dbInstance
  ) {
    const offset = (page - 1) * limit;

    const [{ value: total }] = await trx.select({ value: count() }).from(products);

    let orderBy;

    switch (sort) {
      case 'price_asc':
        orderBy = products.price;
        break;
      case 'price_desc':
        orderBy = desc(products.price);
        break;
      case 'latest_asc':
        orderBy = products.createdAt;
        break;
      case 'latest_desc':
      default:
        orderBy = desc(products.createdAt);
        break;
    }

    const whereConditions = [vendorId ? eq(products.vendorId, vendorId) : eq(products.status, 'published')];

    const items = await trx
      .select()
      .from(products)
      .where(and(...whereConditions))
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);

    return {
      items,
      total,
    };
  }
}

export const productRepository = new ProductRepository();
