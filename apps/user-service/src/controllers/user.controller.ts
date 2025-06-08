import { insertUserSchema } from '@/models/user.model';
import { userService } from '@/services/user.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, RequestHandler, Response } from 'express';

class UserController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const data = insertUserSchema.parse(req.body);
    const serviceResponse = await userService.createUser(data);
    handleServiceResponse(serviceResponse, res);
  };

  public getMe: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await userService.getMe(req);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserByEmail: RequestHandler = async (req: Request, res: Response) => {
    const { email } = req.params;
    const serviceResponse = await userService.getUserByEmail(email);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceResponse = await userService.getUserById(id);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyPassword: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const serviceResponse = await userService.verifyPassword(email, password);
    handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
