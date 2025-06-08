import { tokenConfig } from '@/configs/token';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  verifyUserSchema,
} from '@/models/auth.user.model';
import { authService } from '@/services/auth.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { tokenService } from '@/services/token.service';

class AuthUserController {
  public signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = signUpSchema.parse(req.body);
    const serviceResponse = await authService.signUp(data, next);
    handleServiceResponse(serviceResponse, res);
  };

  public signIn: RequestHandler = async (req: Request, res: Response) => {
    const data = signInSchema.parse(req.body);
    const serviceResponse = await authService.signIn(data, res);
    handleServiceResponse(serviceResponse, res);
  };

  public forgotPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = forgotPasswordSchema.parse(req.body);
    const serviceResponse = await authService.forgotPassword(data.email, next);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyUser: RequestHandler = async (req: Request, res: Response) => {
    const data = verifyUserSchema.parse(req.body);
    const serviceResponse = await authService.verifyUser(data);
    handleServiceResponse(serviceResponse, res);
  };

  public resetPassword: RequestHandler = async (req: Request, res: Response) => {
    const data = resetPasswordSchema.parse(req.body);
    const serviceResponse = await authService.resetPassword(data.token, data.password);
    handleServiceResponse(serviceResponse, res);
  };

  public renewToken: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authService.refreshToken(req, res);
    handleServiceResponse(serviceResponse, res);
  };

  public signOut: RequestHandler = async (req: Request, res: Response) => {
    const refreshToken = req.cookies[tokenConfig.refreshToken.cookieName];
    const serviceResponse = await authService.signOut(refreshToken);

    res.clearCookie(tokenConfig.refreshToken.cookieName);
    handleServiceResponse(serviceResponse, res);
  };

  public getMe: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const serviceResponse = await authService.getMe(userId!);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyResetPasswordToken: RequestHandler = async (req: Request, res: Response) => {
    const { token } = req.params;
    const serviceResponse = await tokenService.verifyResetPasswordToken(token);
    handleServiceResponse(serviceResponse, res);
  };
}

export const authUserController = new AuthUserController();
