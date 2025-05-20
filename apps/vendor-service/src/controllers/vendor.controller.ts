import { authVendorService } from '@/services/auth.vendor.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, RequestHandler, Response } from 'express';

class VendorController {
  public getVendor: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authVendorService.getVendor(req);
    handleServiceResponse(serviceResponse, res);
  };
}

export const vendorController = new VendorController();
