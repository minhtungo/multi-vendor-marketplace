import { db } from '@/db';
import { cart, cartItems } from '@/db/schemas';
import { CartItem } from '@/models/cart-item.model';
import { InsertCart, UpdateCart } from '@/models/cart.model';
import { normalizeCartData } from '@/repositories/utils';
import { eq } from 'drizzle-orm';

export class CartRepository {
  constructor(private readonly dbInstance = db) {}

  async createCart(cartData: InsertCart) {
    const result = await this.dbInstance.insert(cart).values(cartData).returning();
    return {
      ...result[0],
      items: [] as CartItem[],
    };
  }

  async updateCart(cartId: string, cartData: UpdateCart, trx: typeof db = this.dbInstance) {
    const shippingAddress = cartData.shippingAddress;
    const billingAddress = cartData.billingAddress;
    const shippingMethod = cartData.shippingMethod;

    await trx
      .update(cart)
      .set({
        ...cartData,
        ...(shippingAddress && {
          shippingFirstName: shippingAddress.firstName,
          shippingLastName: shippingAddress.lastName,
          shippingAddressLine1: shippingAddress.address1,
          shippingCity: shippingAddress.city,
          shippingState: shippingAddress.state,
          shippingPostalCode: shippingAddress.postalCode,
        }),
        ...(billingAddress && {
          billingFirstName: billingAddress.firstName,
          billingLastName: billingAddress.lastName,
          billingAddressLine1: billingAddress.address1,
          billingCity: billingAddress.city,
          billingState: billingAddress.state,
          billingPostalCode: billingAddress.postalCode,
        }),
        ...(shippingMethod && {
          shippingMethodName: shippingMethod.name,
          shippingMethodId: shippingMethod.id,
          shippingMethodPrice: shippingMethod.price,
        }),
      })
      .where(eq(cart.id, cartId))
      .returning();
  }

  async getCartByUserId(userId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.userId, userId),
      with: {
        items: true,
      },
    });

    return result ? normalizeCartData(result) : null;
  }

  async getCartById(cartId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.id, cartId),
      with: {
        items: true,
      },
    });

    return result ? normalizeCartData(result) : null;
  }

  async getCartBySessionId(sessionId: string) {
    const result = await this.dbInstance.query.cart.findFirst({
      where: eq(cart.sessionId, sessionId),
      with: {
        items: true,
      },
    });

    return result ? normalizeCartData(result) : null;
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

  async clearCartItems(cartId: string, trx: typeof db = this.dbInstance) {
    await trx.delete(cartItems).where(eq(cartItems.cartId, cartId));
  }
}

export const cartRepository = new CartRepository();
