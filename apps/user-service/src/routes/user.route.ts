import { userController } from '@/controllers/user.controller';
import { insertUserSchema, userSchema } from '@/models/user.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';

import { z } from 'zod/v4';

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.registerPath({
  method: 'post',
  path: `/users`,
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertUserSchema,
        },
      },
    },
  },
  responses: createApiResponse(userSchema, 'Success'),
});

userRouter.post('/', userController.createUser);

userRegistry.registerPath({
  method: 'get',
  path: `/users/me`,
  tags: ['Users'],
  request: {},
  responses: createApiResponse(userSchema, 'Success'),
});

userRouter.get('/me', userController.getMe);

userRegistry.registerPath({
  method: 'get',
  path: `/users/email/{email}`,
  tags: ['Users'],
  request: {
    params: z.object({
      email: z.email(),
    }),
  },
  responses: createApiResponse(userSchema, 'Success'),
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
  responses: createApiResponse(userSchema, 'Success'),
});

userRouter.get('/:id', validateRequest(z.object({ params: z.object({ id: z.string() }) })), userController.getUserById);

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
