import { userController } from '@/controllers/user.controller';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import express, { type Router } from 'express';

import z from 'zod';

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.registerPath({
  method: 'post',
  path: `/users`,
  tags: ['Users'],
  request: {},
  responses: createApiResponse(z.null(), 'Success'),
});

userRouter.post('/users', userController.createUser);

userRegistry.registerPath({
  method: 'get',
  path: `/users/me`,
  tags: ['Users'],
  request: {},
  responses: createApiResponse(z.null(), 'Success'),
});

userRouter.get('/users/me', userController.getMe);
