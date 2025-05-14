import { VendorSignInSchema, VendorSignUpSchema, VerifyVendorSchema } from '@/models/vendor.model';
import { vendorService } from '@/services/vendor.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

class VendorController {
  public signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = VendorSignUpSchema.parse(req.body);
    const serviceResponse = await vendorService.signUp(data, next);
    handleServiceResponse(serviceResponse, res);
  };

  public signIn: RequestHandler = async (req: Request, res: Response) => {
    const data = VendorSignInSchema.parse(req.body);
    const serviceResponse = await vendorService.signIn(data, res);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyVendor: RequestHandler = async (req: Request, res: Response) => {
    const data = VerifyVendorSchema.parse(req.body);
    const serviceResponse = await vendorService.verifyVendor(data);
    handleServiceResponse(serviceResponse, res);
  };
}

export const vendorController = new VendorController();
