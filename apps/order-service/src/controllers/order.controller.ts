import { CreateOrderSchema, GetAllOrdersSchema, GetOrderByIdSchema } from '@/models/order.model';
import { orderService } from '@/services/order.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { NextFunction, Request, Response } from 'express';

class OrderController {
  public getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = GetAllOrdersSchema.parse(req);
    const serviceResponse = await orderService.getAllOrders(query.page, query.limit, query.vendorId);
    handleServiceResponse(serviceResponse, res);
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = GetOrderByIdSchema.parse(req);
    const serviceResponse = await orderService.getOrderById(params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = CreateOrderSchema.parse(req);
    const serviceResponse = await orderService.createOrder(body);
    handleServiceResponse(serviceResponse, res);
  };
}

export const orderController = new OrderController();
