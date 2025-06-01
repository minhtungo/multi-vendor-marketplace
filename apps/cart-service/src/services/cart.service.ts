import { cartRepository } from '@/repositories/cart.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/server/lib';
import type { Cart, CartUpdate, CartWithItems } from '@/models/cart.model';

class CartService {
  constructor(private readonly cartRepo = cartRepository) {}

  public async updateCart(cartId: string, cartData: CartUpdate): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'updateCart',
      async () => {
        const existingCart = await this.cartRepo.getCartById(cartId);

        if (!existingCart) {
          return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        await this.cartRepo.updateCart(cartId, cartData);
        return ServiceResponse.success('Cart updated successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async getOrCreateCart(userId?: string, sessionId?: string): Promise<ServiceResponse<CartWithItems | null>> {
    return executeWithErrorHandling(
      'getOrCreateCart',
      async () => {
        const cart = userId
          ? await this.cartRepo.getCartByUserId(userId)
          : await this.cartRepo.getCartBySessionId(sessionId!);

        if (!cart) {
          const newCart = await this.cartRepo.createCart({
            userId,
            sessionId: !userId ? sessionId : undefined,
          });

          return ServiceResponse.success('Cart created successfully', newCart, HTTP_STATUS_CODES.CREATED);
        }

        return ServiceResponse.success('Cart retrieved successfully', cart, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async mergeCart(userId?: string, guestSessionId?: string): Promise<ServiceResponse<Cart | null>> {
    return executeWithErrorHandling(
      'mergeCart',
      async () => {
        if (!userId) {
          return ServiceResponse.failure(
            'User must be authenticated to merge cart',
            null,
            HTTP_STATUS_CODES.BAD_REQUEST
          );
        }

        if (!guestSessionId) {
          return ServiceResponse.failure('Guest session ID is required', null, HTTP_STATUS_CODES.BAD_REQUEST);
        }

        const userCart = await this.cartRepo.getCartByUserId(userId);
        const guestCart = await this.cartRepo.getCartBySessionId(guestSessionId);

        if (!guestCart) {
          if (userCart) {
            return ServiceResponse.success('No guest cart to merge', userCart, HTTP_STATUS_CODES.OK);
          } else {
            const newCart = await this.cartRepo.createCart({ userId });
            return ServiceResponse.success('New user cart created', newCart, HTTP_STATUS_CODES.CREATED);
          }
        }

        if (!userCart) {
          const mergedCart = await this.cartRepo.mergeCartToUser(guestCart.id, userId);
          return ServiceResponse.success('Guest cart converted to user cart', mergedCart, HTTP_STATUS_CODES.OK);
        }

        await this.cartRepo.deleteCart(guestCart.id);

        return ServiceResponse.success('Carts merged successfully', userCart, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async deleteCart(cartId: string): Promise<ServiceResponse<null>> {
    return executeWithErrorHandling(
      'deleteCart',
      async () => {
        const existingCart = await this.cartRepo.getCartByUserId(cartId);
        if (!existingCart) {
          return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        await this.cartRepo.deleteCart(cartId);
        return ServiceResponse.success('Cart deleted successfully', null, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }
}

export const cartService = new CartService();
