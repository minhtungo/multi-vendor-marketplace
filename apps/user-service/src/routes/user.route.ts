import { userController } from '@/controllers/user.controller';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
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

userRouter.post('/', userController.createUser);

userRegistry.registerPath({
  method: 'get',
  path: `/users/me`,
  tags: ['Users'],
  request: {},
  responses: createApiResponse(z.null(), 'Success'),
});

userRouter.get('/me', userController.getMe);

userRegistry.registerPath({
  method: 'get',
  path: `/users/email/{email}`,
  tags: ['Users'],
  request: {
    params: z.object({
      email: z.string().email(),
    }),
  },
  responses: createApiResponse(z.null(), 'Success'),
});

userRouter.get('/email/:email', userController.getUserByEmail);

userRegistry.registerPath({
  method: 'get',
  path: `/users/{id}`,
  tags: ['Users'],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: createApiResponse(z.null(), 'Success'),
});

userRouter.get('/:id', userController.getUserById);

userRegistry.registerPath({
  method: 'post',
  path: `/users/verify-password`,
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            password: z.string(),
          }),
        },
      },
    },
  },
  responses: createApiResponse(z.object({ isValid: z.boolean() }), 'Success'),
});

userRouter.post('/verify-password', userController.verifyPassword);
