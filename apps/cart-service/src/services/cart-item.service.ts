import { cartItemRepository } from '@/repositories/cart-item.repository';
import { cartRepository } from '@/repositories/cart.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import type { CartItem, InsertCartItem } from '@/db/schemas/cart-items/validation';
import { cartService } from '@/services/cart.service';

class CartItemService {
  constructor(
    private readonly cartItemRepo = cartItemRepository,
    private readonly cartRepo = cartRepository
  ) {}

  public async addItemToCart(
    userId: string | undefined,
    sessionId: string | undefined,
    cartItemData: Omit<InsertCartItem, 'cartId' | 'id' | 'total' | 'createdAt' | 'updatedAt'>
  ): Promise<ServiceResponse<CartItem | null>> {
    try {
      const cartResponse = await cartService.getOrCreateCart(userId, sessionId);

      if (!cartResponse.success || !cartResponse.data) {
        return ServiceResponse.failure('Failed to get or create cart', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
      }

      const cart = cartResponse.data;

      const existingCartItem = await this.cartItemRepo.getCartItemByProductAndCart(cart.id, cartItemData.productId);

      let cartItem: CartItem;

      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + cartItemData.quantity!;
        const newTotal = (parseFloat(cartItemData.price) * newQuantity).toFixed(2);

        cartItem = await this.cartItemRepo.updateCartItem(existingCartItem.id, {
          quantity: newQuantity,
          total: newTotal,
          updatedAt: new Date(),
        });
      } else {
        const total = (parseFloat(cartItemData.price) * cartItemData.quantity!).toFixed(2);

        cartItem = await this.cartItemRepo.createCartItem({
          cartId: cart.id,
          productId: cartItemData.productId,
          price: cartItemData.price,
          quantity: cartItemData.quantity,
          total,
        });
      }

      const cartItems = await this.cartItemRepo.getCartItemsByCartId(cart.id);
      const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
      const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

      await this.cartRepo.updateCart(cart.id, {
        subtotal,
        total: subtotal,
        itemCount,
        updatedAt: new Date(),
      });

      return ServiceResponse.success('Item added to cart successfully', cartItem, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error adding item to cart: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const cartItemService = new CartItemService();
