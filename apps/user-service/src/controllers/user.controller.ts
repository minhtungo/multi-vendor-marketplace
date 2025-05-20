import { userService } from '@/services/user.service';
import { handleServiceResponse } from '@repo/server/lib';
import type { Request, RequestHandler, Response } from 'express';

class UserController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const serviceResponse = await userService.createUser({ name, email, password });
    handleServiceResponse(serviceResponse, res);
  };

  public getMe: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await userService.getMe(req);
    handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
