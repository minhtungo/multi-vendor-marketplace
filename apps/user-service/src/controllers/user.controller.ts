import { CreateUserSchema, GetUserByEmailSchema, GetUserByIdSchema, VerifyPasswordSchema } from '@/models/user.model';
import { userService } from '@/services/user.service';
import { handleServiceResponse } from '@repo/shared-server/lib';
import type { Request, RequestHandler, Response } from 'express';

class UserController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const { body } = CreateUserSchema.parse(req);
    const serviceResponse = await userService.createUser(body);
    handleServiceResponse(serviceResponse, res);
  };

  public getMe: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await userService.getMe(req);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserByEmail: RequestHandler = async (req: Request, res: Response) => {
    const { params } = GetUserByEmailSchema.parse(req);
    const serviceResponse = await userService.getUserByEmail(params.email);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const { params } = GetUserByIdSchema.parse(req);
    const serviceResponse = await userService.getUserById(params.id);
    handleServiceResponse(serviceResponse, res);
  };

  public verifyPassword: RequestHandler = async (req: Request, res: Response) => {
    const { body } = VerifyPasswordSchema.parse(req);
    const serviceResponse = await userService.verifyPassword(body.email, body.password);
    handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
