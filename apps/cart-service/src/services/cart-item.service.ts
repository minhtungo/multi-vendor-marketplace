import { CartItem, CartItemInsert, CartItemUpdate } from '@/models/cart-item.model';
import { cartItemRepository } from '@/repositories/cart-item.repository';
import { cartRepository } from '@/repositories/cart.repository';
import { cartService } from '@/services/cart.service';
import { logger } from '@/utils/logger';
import { createTransaction } from '@/utils/transaction';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/server/lib';

class CartItemService {
  constructor(
    private readonly cartItemRepo = cartItemRepository,
    private readonly cartRepo = cartRepository
  ) {}

  public async addItemToCart(
    userId: string | undefined,
    sessionId: string | undefined,
    cartItemData: CartItemInsert
  ): Promise<ServiceResponse<CartItem | null>> {
    return executeWithErrorHandling(
      'addItemToCart',
      async () => {
        const cartResponse = await cartService.getOrCreateCart(userId, sessionId);

        if (!cartResponse.success || !cartResponse.data) {
          return ServiceResponse.failure('Failed to get or create cart', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        const cart = cartResponse.data;

        let updatedCartItem: CartItem | null = null;

        await createTransaction(async (trx) => {
          const existingCartItem = cart?.items?.find((item) => item.productId === cartItemData.productId);

          if (existingCartItem) {
            updatedCartItem = await this.cartItemRepo.updateCartItem(
              existingCartItem.id,
              {
                quantity: existingCartItem.quantity + (cartItemData.quantity || 1),
              },
              trx
            );
          } else {
            updatedCartItem = await this.cartItemRepo.createCartItem(
              {
                ...cartItemData,
                cartId: cart.id,
              },
              trx
            );
          }

          const total = (parseFloat(cart.total) + parseFloat(cartItemData.price) * cartItemData.quantity).toFixed(2);
          const itemCount = (cart.itemCount || 0) + cartItemData.quantity;

          await this.cartRepo.updateCart(
            cart.id,
            {
              subtotal: total,
              total,
              itemCount,
            },
            trx
          );
        });

        return ServiceResponse.success('Item added to cart successfully', updatedCartItem, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async updateCartItem(
    userId: string | undefined,
    sessionId: string | undefined,
    cartItemId: string,
    data: CartItemUpdate
  ): Promise<ServiceResponse<CartItem | null>> {
    return executeWithErrorHandling(
      'updateCartItem',
      async () => {
        const cartResponse = await cartService.getOrCreateCart(userId, sessionId);

        if (!cartResponse.success || !cartResponse.data) {
          return ServiceResponse.failure('Failed to get cart', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        const cart = cartResponse.data;

        if (userId && cart.userId !== userId) {
          return ServiceResponse.failure('Cart item not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        if (sessionId && cart.sessionId !== sessionId) {
          return ServiceResponse.failure('Cart item not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        const targetCartItem = await this.cartItemRepo.getCartItemById(cartItemId);

        if (!targetCartItem || targetCartItem.cartId !== cart.id) {
          return ServiceResponse.failure('Cart item not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        if (data.quantity && data.quantity < 0) {
          return ServiceResponse.failure('Quantity cannot be negative', null, HTTP_STATUS_CODES.BAD_REQUEST);
        }

        let updatedCartItem: CartItem | null = null;

        await createTransaction(async (trx) => {
          updatedCartItem = await this.cartItemRepo.updateCartItem(
            cartItemId,
            {
              ...data,
              quantity: data.quantity || 1,
            },
            trx
          );

          const allCartItems = cart.items;

          const subtotal = allCartItems
            .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
            .toFixed(2);
          const itemCount = allCartItems.reduce((sum, item) => sum + item.quantity, 0);

          await this.cartRepo.updateCart(
            cart.id,
            {
              subtotal,
              total: subtotal,
              itemCount,
            },
            trx
          );
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
  ): Promise<ServiceResponse<boolean>> {
    return executeWithErrorHandling(
      'removeCartItem',
      async () => {
        const cartResponse = await cartService.getOrCreateCart(userId, sessionId);

        if (!cartResponse.success || !cartResponse.data) {
          return ServiceResponse.failure('Failed to get cart', false, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        const cart = cartResponse.data;

        if (userId && cart.userId !== userId) {
          return ServiceResponse.failure('Cart item not found', false, HTTP_STATUS_CODES.NOT_FOUND);
        }

        if (sessionId && cart.sessionId !== sessionId) {
          return ServiceResponse.failure('Cart item not found', false, HTTP_STATUS_CODES.NOT_FOUND);
        }

        const targetCartItem = cart.items?.find((item) => item.id === cartItemId);

        if (!targetCartItem || targetCartItem.cartId !== cart.id) {
          return ServiceResponse.failure('Cart item not found', false, HTTP_STATUS_CODES.NOT_FOUND);
        }

        await createTransaction(async (trx) => {
          await this.cartItemRepo.deleteCartItem(cartItemId, trx);

          const subtotal = (
            parseFloat(cart.subtotal) -
            parseFloat(targetCartItem.price) * targetCartItem.quantity
          ).toFixed(2);

          const itemCount = cart.itemCount! - targetCartItem.quantity;

          if (itemCount < 0) {
            throw new Error('Invalid item count');
          }

          await this.cartRepo.updateCart(
            cart.id,
            {
              subtotal,
              total: subtotal,
              itemCount,
            },
            trx
          );
        });

        return ServiceResponse.success('Cart item removed successfully', true, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }
}

export const cartItemService = new CartItemService();
