import { db } from '@/db';
import { cart, cartItems } from '@/db/schemas';
import type { InsertCart } from '@/db/schemas/cart/validation';
import { eq } from 'drizzle-orm';

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
      with: {
        items: true,
      },
    });

    return result;
  }

  async getCartById(cartId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.id, cartId),
      with: {
        items: true,
      },
    });

    return result;
  }

  async getCartBySessionId(sessionId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.sessionId, sessionId),
      with: {
        items: true,
      },
    });

    return result;
  }

  async mergeCartToUser(cartId: string, userId: string) {
    const result = await this.dbInstance
      .update(cart)
      .set({
        userId,
        sessionId: null,
        updatedAt: new Date(),
      })
      .where(eq(cart.id, cartId))
      .returning();

    return result[0];
  }

  async recalculateCartTotals(cartId: string) {
    // Get all items in the cart
    const items = await this.dbInstance.query.cartItems.findMany({
      where: eq(cartItems.cartId, cartId),
    });

    const itemCount = items.length;
    const subtotal = items.reduce((sum, item) => {
      return sum + parseFloat(item.price.toString()) * item.quantity;
    }, 0);

    // Update cart totals
    await this.dbInstance
      .update(cart)
      .set({
        subtotal: subtotal.toFixed(2),
        total: subtotal.toFixed(2), // In a real app, you'd add taxes, shipping, etc.
        itemCount,
        updatedAt: new Date(),
      })
      .where(eq(cart.id, cartId));
  }

  async deleteCart(cartId: string) {
    const result = await this.dbInstance.delete(cart).where(eq(cart.id, cartId)).returning();
    return result[0];
  }
}

export const cartRepository = new CartRepository();
