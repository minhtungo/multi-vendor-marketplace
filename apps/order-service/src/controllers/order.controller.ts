import { orderService } from '@/services/order.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, Response } from 'express';

class OrderController {
  public createStripeConnectLink = async (req: Request, res: Response) => {
    // const data = CreateConnectLinkSchema.parse(req.body);
    const serviceResponse = await orderService.createConnectAccountLink(req.user!);
    handleServiceResponse(serviceResponse, res);
  };
}

export const orderController = new OrderController();
