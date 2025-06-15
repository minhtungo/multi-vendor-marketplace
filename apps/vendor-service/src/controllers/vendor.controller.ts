import { GetVendorByEmailSchema, GetVendorByIdSchema, VerifyPasswordRequestSchema } from '@/models/vendor.model';
import { vendorService } from '@/services/vendor.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, RequestHandler, Response } from 'express';

class VendorController {
  public getVendorById: RequestHandler = async (req: Request, res: Response) => {
    const { params } = GetVendorByIdSchema.parse(req);
    const serviceResponse = await vendorService.getVendorById(params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public getVendorByEmail: RequestHandler = async (req: Request, res: Response) => {
    const { params } = GetVendorByEmailSchema.parse(req);
    const serviceResponse = await vendorService.getVendorByEmail(params.email);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyPassword: RequestHandler = async (req: Request, res: Response) => {
    const { body } = VerifyPasswordRequestSchema.parse(req);
    const serviceResponse = await vendorService.verifyPassword(body.email, body.password);

    handleServiceResponse(serviceResponse, res);
  };
}

export const vendorController = new VendorController();
