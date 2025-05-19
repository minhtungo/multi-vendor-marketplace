import { InsertOrder, Order } from '@/db/schemas';
import { orderRepository } from '@/repositories/order.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

class OrderService {
  constructor(private readonly orderRepo = orderRepository) {}

  public async getAllOrders(
    page: number,
    limit: number
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
      const result = await this.orderRepo.getPaginatedOrders(page, limit);

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

  public async getOrderById(id: number): Promise<ServiceResponse<Order | null>> {
    try {
      const order = await this.orderRepo.getOrderById(id);

      if (!order) {
        return ServiceResponse.failure('Order not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      }

      return ServiceResponse.success('Order retrieved successfully', order, HTTP_STATUS_CODES.OK);
    } catch (error) {
      const errorMessage = `Error fetching order: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async createOrder(orderData: InsertOrder): Promise<ServiceResponse<Order | null>> {
    try {
      const order = await this.orderRepo.createOrder(orderData);
      return ServiceResponse.success('Order created successfully', order, HTTP_STATUS_CODES.CREATED);
    } catch (error) {
      const errorMessage = `Error creating order: ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('Internal server error', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const orderService = new OrderService();
