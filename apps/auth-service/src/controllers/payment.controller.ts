import { stripeService } from '@/services/stripe.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import { Request, Response } from 'express';

class PaymentController {
  public createStripeConnectLink = async (req: Request, res: Response) => {
    // const data = CreateConnectLinkSchema.parse(req.body);
    const serviceResponse = await stripeService.createConnectAccountLink(req.user?.id!);
    handleServiceResponse(serviceResponse, res);
  };
}

export const paymentController = new PaymentController();
