import { createPaymentIntentSchema } from '@/models/payment.model';
import { paymentService } from '@/services/payment.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, Response } from 'express';

class PaymentController {
  public createStripeConnectLink = async (req: Request, res: Response) => {
    const serviceResponse = await paymentService.createConnectAccountLink(req.user!);
    handleServiceResponse(serviceResponse, res);
  };

  public createPaymentIntent = async (req: Request, res: Response) => {
    const data = createPaymentIntentSchema.parse(req.body);
    const serviceResponse = await paymentService.createPaymentIntent(data);
    handleServiceResponse(serviceResponse, res);
  };
}

export const paymentController = new PaymentController();
