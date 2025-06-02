import { InsertOrder, Order } from '@/db/schemas';
import { orderRepository } from '@/repositories/order.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/shared-server/lib';

class OrderService {
  constructor(private readonly orderRepo = orderRepository) {}

  public async getAllOrders(
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
    return executeWithErrorHandling(
      'getAllOrders',
      async () => {
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
      },
      logger
    );
  }

  public async getOrderById(id: number): Promise<ServiceResponse<Order | null>> {
    return executeWithErrorHandling(
      'getOrderById',
      async () => {
        const order = await this.orderRepo.getOrderById(id);

        if (!order) {
          return ServiceResponse.failure('Order not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        return ServiceResponse.success('Order retrieved successfully', order, HTTP_STATUS_CODES.OK);
      },
      logger
    );
  }

  public async createOrder(orderData: InsertOrder): Promise<ServiceResponse<Order | null>> {
    return executeWithErrorHandling(
      'createOrder',
      async () => {
        const order = await this.orderRepo.createOrder(orderData);
        return ServiceResponse.success('Order created successfully', order, HTTP_STATUS_CODES.CREATED);
      },
      logger
    );
  }
}

export const orderService = new OrderService();
