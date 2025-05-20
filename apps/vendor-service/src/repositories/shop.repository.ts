import { db } from '@/db';
import { InsertShop, Shop, shops } from '@/db/schemas';

export class ShopRepository {
  constructor(private readonly dbInstance = db) {}

  async createShop(shop: InsertShop, trx: typeof db = this.dbInstance) {
    const [newShop] = await trx
      .insert(shops)
      .values({ ...shop })
      .returning();

    return newShop as Shop;
  }
}

export const shopRepository = new ShopRepository();
