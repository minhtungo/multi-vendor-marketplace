import { cartRepository } from '@/repositories/cart.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/server/lib';
import type { Cart, InsertCart } from '@/db/schemas/cart/validation';

class CartService {
  constructor(private readonly cartRepo = cartRepository) {}

  public async updateCart(cartId: string, cartData: Partial<InsertCart>): Promise<ServiceResponse<Cart | null>> {
    return executeWithErrorHandling(
      'updateCart',
      async () => {
        const existingCart = await this.cartRepo.getCartByUserId(cartId);
        if (!existingCart) {
          return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        const updatedCart = await this.cartRepo.updateCart(cartId, cartData);
        return ServiceResponse.success('Cart updated successfully', updatedCart, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async getOrCreateCart(userId?: string, sessionId?: string): Promise<ServiceResponse<Cart | null>> {
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
