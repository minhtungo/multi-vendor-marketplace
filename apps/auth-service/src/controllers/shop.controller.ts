import { insertShopSchema } from '@/db/schemas/shops';
import { shopService } from '@/services/shop.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import type { NextFunction, Request, Response } from 'express';

class ShopController {
  public createShop = async (req: Request, res: Response, next: NextFunction) => {
    const data = insertShopSchema.parse(req.body);
    const serviceResponse = await shopService.createShop(data, req.user?.id!, next);
    handleServiceResponse(serviceResponse, res);
  };
}

export const shopController = new ShopController();
