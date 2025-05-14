import { CreateConnectLinkSchema } from '@/models/stripe.model';
import { stripeService } from '@/services/stripe.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import { NextFunction, Request, Response } from 'express';

class StripeController {
  public createStripeConnectLink = async (req: Request, res: Response, next: NextFunction) => {
    // const data = CreateConnectLinkSchema.parse(req.body);
    const serviceResponse = await stripeService.createConnectAccountLink(req.user?.id!);
    handleServiceResponse(serviceResponse, res);
  };
}

export const stripeController = new StripeController();
