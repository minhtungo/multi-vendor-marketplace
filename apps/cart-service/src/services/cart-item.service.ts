import { cartItemRepository } from '@/repositories/cart-item.repository';
import { cartRepository } from '@/repositories/cart.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/server/lib';
import type { CartItem, InsertCartItem } from '@/db/schemas/cart-items/validation';
import { cartService } from '@/services/cart.service';

class CartItemService {
  constructor(
    private readonly cartItemRepo = cartItemRepository,
    private readonly cartRepo = cartRepository
  ) {}

  //TODO: Improve this
  public async addItemToCart(
    userId: string | undefined,
    sessionId: string | undefined,
    cartItemData: Omit<InsertCartItem, 'cartId' | 'id' | 'total' | 'createdAt' | 'updatedAt'>
  ): Promise<ServiceResponse<CartItem | null>> {
    return executeWithErrorHandling(
      'addItemToCart',
      async () => {
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
      },
      logger
    );
  }

  public async updateCartItemQuantity(
    userId: string | undefined,
    sessionId: string | undefined,
    cartItemId: string,
    quantity: number
  ): Promise<ServiceResponse<CartItem | null>> {
    return executeWithErrorHandling(
      'updateCartItemQuantity',
      async () => {
        const cartResponse = await cartService.getOrCreateCart(userId, sessionId);

        if (!cartResponse.success || !cartResponse.data) {
          return ServiceResponse.failure('Failed to get cart', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        const cart = cartResponse.data;

        const targetCartItem = await this.cartItemRepo.getCartItemById(cartItemId);

        if (!targetCartItem || targetCartItem.cartId !== cart.id) {
          return ServiceResponse.failure('Cart item not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        const newTotal = (parseFloat(targetCartItem.price) * quantity).toFixed(2);

        const updatedCartItem = await this.cartItemRepo.updateCartItem(cartItemId, {
          quantity,
          total: newTotal,
          updatedAt: new Date(),
        });

        const allCartItems = await this.cartItemRepo.getCartItemsByCartId(cart.id);
        const subtotal = allCartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
        const itemCount = allCartItems.reduce((sum, item) => sum + item.quantity, 0);

        await this.cartRepo.updateCart(cart.id, {
          subtotal,
          total: subtotal,
          itemCount,
          updatedAt: new Date(),
        });

        return ServiceResponse.success(
          'Cart item quantity updated successfully',
          updatedCartItem,
          HTTP_STATUS_CODES.OK
        );
      },
      logger
    );
  }

  public async removeCartItem(
    userId: string | undefined,
    sessionId: string | undefined,
    cartItemId: string
  ): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'removeCartItem',
      async () => {
        const cartResponse = await cartService.getOrCreateCart(userId, sessionId);

        if (!cartResponse.success || !cartResponse.data) {
          return ServiceResponse.failure('Failed to get cart', false, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        const cart = cartResponse.data;

        // Get the specific cart item
        const targetCartItem = await this.cartItemRepo.getCartItemById(cartItemId);

        if (!targetCartItem || targetCartItem.cartId !== cart.id) {
          return ServiceResponse.failure('Cart item not found', false, HTTP_STATUS_CODES.NOT_FOUND);
        }

        await this.cartItemRepo.deleteCartItem(cartItemId);

        const remainingCartItems = await this.cartItemRepo.getCartItemsByCartId(cart.id);
        const subtotal = remainingCartItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
        const itemCount = remainingCartItems.reduce((sum, item) => sum + item.quantity, 0);

        await this.cartRepo.updateCart(cart.id, {
          subtotal,
          total: subtotal,
          itemCount,
          updatedAt: new Date(),
        });

        return ServiceResponse.success('Cart item removed successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }
}

export const cartItemService = new CartItemService();
