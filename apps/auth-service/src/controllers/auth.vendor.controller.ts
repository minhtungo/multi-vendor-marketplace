import { VendorSignInSchema, VendorSignUpSchema, VerifyVendorSchema } from '@/models/auth.vendor.model';
import { authVendorService } from '@/services/auth.vendor.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

class AuthVendorController {
  public signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = VendorSignUpSchema.parse(req.body);
    const serviceResponse = await authVendorService.signUp(data, next);
    handleServiceResponse(serviceResponse, res);
  };

  public signIn: RequestHandler = async (req: Request, res: Response) => {
    const data = VendorSignInSchema.parse(req.body);
    const serviceResponse = await authVendorService.signIn(data, res);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyVendor: RequestHandler = async (req: Request, res: Response) => {
    const data = VerifyVendorSchema.parse(req.body);
    const serviceResponse = await authVendorService.verifyVendor(data);
    handleServiceResponse(serviceResponse, res);
  };

  public renewToken: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authVendorService.renewToken(req, res);
    handleServiceResponse(serviceResponse, res);
  };

  public getVendor: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authVendorService.getVendor(req);
    handleServiceResponse(serviceResponse, res);
  };
}

export const authVendorController = new AuthVendorController();
