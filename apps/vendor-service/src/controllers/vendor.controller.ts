import { verifyPasswordSchema } from '@/models/vendor.model';
import { vendorService } from '@/services/vendor.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, RequestHandler, Response } from 'express';

class VendorController {
  public getVendorById: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await vendorService.getVendorById(req.params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public getVendorByEmail: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await vendorService.getVendorByEmail(req.params.email);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyPassword: RequestHandler = async (req: Request, res: Response) => {
    const data = verifyPasswordSchema.parse(req.body);
    const serviceResponse = await vendorService.verifyPassword(data.email, data.password);

    handleServiceResponse(serviceResponse, res);
  };
}

export const vendorController = new VendorController();
