import { db } from '@/db';
import { cart } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import type { InsertCart } from '@/db/schemas/cart/validation';

export class CartRepository {
  constructor(private readonly dbInstance = db) {}

  async createCart(cartData: InsertCart) {
    const result = await this.dbInstance.insert(cart).values(cartData).returning();
    return result[0];
  }

  async updateCart(cartId: string, cartData: Partial<InsertCart>) {
    const result = await this.dbInstance.update(cart).set(cartData).where(eq(cart.id, cartId)).returning();
    return result[0];
  }

  async getCartByUserId(userId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.userId, userId),
    });

    return result;
  }

  async getCartBySessionId(sessionId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.sessionId, sessionId),
    });

    return result;
  }
}

export const cartRepository = new CartRepository();
