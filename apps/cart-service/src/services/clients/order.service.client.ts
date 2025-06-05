import { env } from '@/configs/env';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse } from '@repo/shared-server/lib';
import axios from 'axios';
import type { CreateOrderInput, Order } from '@repo/types/order';

class OrderServiceClient {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = env.ORDER_SERVICE_URL;
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<ServiceResponse<T | null>> {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || ServiceResponse.failure('Failed to communicate with order service', null);
      }
      return ServiceResponse.failure('An unexpected error occurred', null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async createOrder(orderData: CreateOrderInput): Promise<ServiceResponse<Order | null>> {
    return this.request<Order>('POST', '/api/orders', orderData);
  }
}

export const orderServiceClient = new OrderServiceClient();
