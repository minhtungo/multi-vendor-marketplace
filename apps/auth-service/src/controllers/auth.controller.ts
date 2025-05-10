import { tokenConfig } from '@/configs/token';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyUserSchema,
} from '@/models/auth.model';
import { authService } from '@/services/auth.service';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

class AuthController {
  public signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = SignUpSchema.parse(req.body);
    const serviceResponse = await authService.signUp(data, next);
    handleServiceResponse(serviceResponse, res);
  };

  public signIn: RequestHandler = async (req: Request, res: Response) => {
    const data = SignInSchema.parse(req.body);
    const { serviceResponse, refreshToken } = await authService.signIn(data);

    if (serviceResponse.success && refreshToken) {
      authService.setRefreshTokenToCookie(res, refreshToken);
    }

    handleServiceResponse(serviceResponse, res);
  };

  public forgotPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = ForgotPasswordSchema.parse(req.body);
    const serviceResponse = await authService.forgotPassword(data.email, next);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyUser: RequestHandler = async (req: Request, res: Response) => {
    const data = VerifyUserSchema.parse(req.body);
    const serviceResponse = await authService.verifyUser(data);
    handleServiceResponse(serviceResponse, res);
  };

  public resetPassword: RequestHandler = async (req: Request, res: Response) => {
    const data = ResetPasswordSchema.parse(req.body);
    const serviceResponse = await authService.resetPassword(data.token, data.password);
    handleServiceResponse(serviceResponse, res);
  };

  public refreshToken: RequestHandler = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.[tokenConfig.refreshToken.cookieName];
    const { refreshToken: newRefreshToken, serviceResponse } = await authService.refreshToken(refreshToken);

    if (serviceResponse.success && newRefreshToken) {
      authService.setRefreshTokenToCookie(res, newRefreshToken);
    }

    if (!serviceResponse.success) {
      res.clearCookie(tokenConfig.refreshToken.cookieName);
    }

    handleServiceResponse(serviceResponse, res);
  };

  public signOut: RequestHandler = async (req: Request, res: Response) => {
    const refreshToken = req.cookies[tokenConfig.refreshToken.cookieName];
    const serviceResponse = await authService.signOut(refreshToken);

    res.clearCookie(tokenConfig.refreshToken.cookieName);
    handleServiceResponse(serviceResponse, res);
  };
}

export const authController = new AuthController();
