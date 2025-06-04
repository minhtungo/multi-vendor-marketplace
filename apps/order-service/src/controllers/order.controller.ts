import { orderInsertSchema } from '@/models/order.model';
import { orderService } from '@/services/order.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { NextFunction, Request, Response } from 'express';

class OrderController {
  public getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const vendorId = req.query.vendorId as string;
    const serviceResponse = await orderService.getAllOrders(page, limit, vendorId);
    handleServiceResponse(serviceResponse, res);
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const serviceResponse = await orderService.getOrderById(id);
    handleServiceResponse(serviceResponse, res);
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderData = orderInsertSchema.parse(req.body);
    const serviceResponse = await orderService.createOrder(orderData);
    handleServiceResponse(serviceResponse, res);
  };
}

export const orderController = new OrderController();
