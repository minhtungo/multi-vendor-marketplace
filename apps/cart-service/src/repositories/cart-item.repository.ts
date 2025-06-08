import { db } from '@/db';
import { cartItems } from '@/db/schemas';
import { InsertCartItem, UpdateCartItem } from '@/models/cart-item.model';
import { eq, and } from 'drizzle-orm';

export class CartItemRepository {
  constructor(private readonly dbInstance = db) {}

  async createCartItem(cartItemData: InsertCartItem & { cartId: string }, trx: typeof db = this.dbInstance) {
    const result = await trx.insert(cartItems).values(cartItemData).returning();
    return result[0];
  }

  async updateCartItem(cartItemId: string, cartItemData: UpdateCartItem, trx: typeof db = this.dbInstance) {
    const result = await trx.update(cartItems).set(cartItemData).where(eq(cartItems.id, cartItemId)).returning();
    return result[0];
  }

  async getCartItemByProductAndCart(cartId: string, productId: string) {
    const result = await this.dbInstance.query.cartItems.findFirst({
      where: and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)),
    });
    return result;
  }

  async getCartItemsByCartId(cartId: string) {
    const result = await this.dbInstance.query.cartItems.findMany({
      where: eq(cartItems.cartId, cartId),
    });
    return result;
  }

  async getCartItemById(cartItemId: string) {
    const result = await this.dbInstance.query.cartItems.findFirst({
      where: eq(cartItems.id, cartItemId),
    });
    return result;
  }

  async deleteCartItem(cartItemId: string, trx: typeof db = this.dbInstance) {
    const result = await trx.delete(cartItems).where(eq(cartItems.id, cartItemId)).returning();
    return result[0];
  }
}

export const cartItemRepository = new CartItemRepository();
