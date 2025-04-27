import { SignUpSchema } from '@/models/auth.model';
import { authService } from '@/services/auth.service';
import { handleServiceResponse } from '@/utils/http-handlers';
import { Request, Response } from 'express';

export const handleSignUp = async (req: Request, res: Response) => {
  const data = SignUpSchema.parse(req.body);

  const serviceResponse = await authService.signUp(data);

  handleServiceResponse(serviceResponse, res);
};
