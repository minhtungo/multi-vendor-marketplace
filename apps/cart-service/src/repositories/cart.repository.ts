import { db } from '@/db';
import { cart } from '@/db/schemas';
import { count, eq } from 'drizzle-orm';
import type { InsertCart, Cart } from '@/db/schemas';

export class CartRepository {
  constructor(private readonly dbInstance = db) {}

  async getCartByUserId(userId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.userId, userId),
    });

    return result;
  }

  async getCartById(cartId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.id, cartId),
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
