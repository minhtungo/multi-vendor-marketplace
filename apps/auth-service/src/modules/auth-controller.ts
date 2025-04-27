import { SignUpSchema } from '@/modules/auth-model';
import { authService } from '@/modules/auth-service';
import { handleServiceResponse } from '@/utils/http-handlers';
import { Request, Response } from 'express';

export const handleSignUp = async (req: Request, res: Response) => {
  const data = SignUpSchema.parse(req.body);

  const serviceResponse = await authService.signUp(data);

  handleServiceResponse(serviceResponse, res);
};
