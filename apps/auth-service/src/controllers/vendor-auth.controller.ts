import { VendorSignUpSchema, VerifyVendorSchema } from '@/models/vendor.model';
import { vendorService } from '@/services/vendor.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import { NextFunction, Request, Response } from 'express';

export const vendorAuthController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const data = VendorSignUpSchema.parse(req.body);
    const serviceResponse = await vendorService.signUp(data, next);
    handleServiceResponse(serviceResponse, res);
  },
  async verifyVendor(req: Request, res: Response) {
    const data = VerifyVendorSchema.parse(req.body);
    const serviceResponse = await vendorService.verifyVendor(data);
    handleServiceResponse(serviceResponse, res);
  },
};
