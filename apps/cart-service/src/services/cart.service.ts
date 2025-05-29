import { cartRepository } from '@/repositories/cart.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

class CartService {
  constructor(private readonly cartRepo = cartRepository) {}

  public async getAllCarts(
    page: number,
    limit: number,
    vendorId: string
  ): Promise<
    ServiceResponse<{
      orders: Order[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    } | null>
  > {
    try {
      const result = await this.orderRepo.getPaginatedOrders(page, limit, vendorId);

      return ServiceResponse.success(
        'Orders retrieved successfully',
        {
          orders: result.items,
          pagination: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
          },
        },
        HTTP_STATUS_CODES.OK
      );
    } catch (error) {
      const errorMessage = `Error fetching orders: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const cartService = new CartService();
