import {
  ForgotPasswordSchema,
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
