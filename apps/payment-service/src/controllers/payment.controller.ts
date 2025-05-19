import { paymentService } from '@/services/payment.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { NextFunction, Request, Response } from 'express';

class PaymentController {
  public createStripeConnectLink = async (req: Request, res: Response) => {
    // const data = CreateConnectLinkSchema.parse(req.body);
    const serviceResponse = await paymentService.createConnectAccountLink(req.user!);
    handleServiceResponse(serviceResponse, res);
  };
}

export const paymentController = new PaymentController();
