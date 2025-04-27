import { tokenConfig } from '@/configs/token';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
} from '@/models/auth.model';
import { authService } from '@/services/auth.service';
import { handleServiceResponse } from '@/utils/http-handlers';
import { Request, Response } from 'express';

export const handleSignUp = async (req: Request, res: Response) => {
  const data = SignUpSchema.parse(req.body);

  const serviceResponse = await authService.signUp(data);

  handleServiceResponse(serviceResponse, res);
};

export const handleSignIn = async (req: Request, res: Response) => {
  const data = SignInSchema.parse(req.body);

  const { serviceResponse, refreshToken } = await authService.signIn(data);

  if (serviceResponse.success && refreshToken) {
    authService.setRefreshTokenToCookie(res, refreshToken);
  }

  handleServiceResponse(serviceResponse, res);
};

export const handleForgotPassword = async (req: Request, res: Response) => {
  const data = ForgotPasswordSchema.parse(req.body);
  const serviceResponse = await authService.forgotPassword(data.email);

  handleServiceResponse(serviceResponse, res);
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const data = ResetPasswordSchema.parse(req.body);

  const serviceResponse = await authService.resetPassword(
    data.token,
    data.password
  );

  handleServiceResponse(serviceResponse, res);
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[tokenConfig.refreshToken.cookieName];

  const { refreshToken: newRefreshToken, serviceResponse } =
    await authService.refreshToken(refreshToken);

  if (serviceResponse.success && newRefreshToken) {
    authService.setRefreshTokenToCookie(res, newRefreshToken);
  }

  if (!serviceResponse.success) {
    res.clearCookie(tokenConfig.refreshToken.cookieName);
  }

  handleServiceResponse(serviceResponse, res);
};

export const handleSignOut = async (req: Request, res: Response) => {
  const refreshToken = req.cookies[tokenConfig.refreshToken.cookieName];
  const serviceResponse = await authService.signOut(refreshToken);

  res.clearCookie(tokenConfig.refreshToken.cookieName);
  handleServiceResponse(serviceResponse, res);
};
