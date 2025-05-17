import { db } from '@/db';
import { type InsertProduct, products } from '@/db/schemas/products';

export class ProductRepository {
  constructor(private readonly dbInstance = db) {}

  public async createProduct(product: InsertProduct, trx: typeof db = this.dbInstance) {
    const [newProduct] = await trx.insert(products).values(product).returning();
    return newProduct;
  }
}

export const productRepository = new ProductRepository();
