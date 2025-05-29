import { cartRepository } from '@/repositories/cart.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import type { Cart } from '@/db/schemas/cart/validation';

class CartService {
  constructor(private readonly cartRepo = cartRepository) {}

  public async getCartByUserId(userId: string): Promise<ServiceResponse<Cart | null>> {
    try {
      const cart = await this.cartRepo.getCartByUserId(userId);

      if (!cart) {
        return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Cart retrieved successfully', cart, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching cart by user ID: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async getCartById(cartId: string): Promise<ServiceResponse<Cart | null>> {
    try {
      const cart = await this.cartRepo.getCartById(cartId);

      if (!cart) {
        return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Cart retrieved successfully', cart, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching cart by ID: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async getCartBySessionId(sessionId: string): Promise<ServiceResponse<Cart | null>> {
    try {
      const cart = await this.cartRepo.getCartBySessionId(sessionId);

      if (!cart) {
        return ServiceResponse.failure('Cart not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Cart retrieved successfully', cart, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching cart by session ID: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const cartService = new CartService();
