import { orderRepository } from '@/repositories/order.repository';

class OrderService {
  constructor(private readonly orderRepo = orderRepository) {}
}

export const orderService = new OrderService();
