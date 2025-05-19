import { insertDiscountCodeSchema } from '@/db/schemas';
import { discountCodeService } from '@/services/discount-code.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { NextFunction, Request, Response } from 'express';

class DiscountCodeController {
  public createDiscountCode = async (req: Request, res: Response, next: NextFunction) => {
    const discountCodeData = insertDiscountCodeSchema.parse(req.body);
    const serviceResponse = await discountCodeService.createDiscountCode(discountCodeData);
    handleServiceResponse(serviceResponse, res);
  };

  public deleteDiscountCode = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const serviceResponse = await discountCodeService.deleteDiscountCode(id);
    handleServiceResponse(serviceResponse, res);
  };
}

export const discountCodeController = new DiscountCodeController();
