import { userController } from '@/controllers/user.controller';
import { CreateUserSchema, GetUserByIdSchema, userSchema, VerifyPasswordSchema } from '@/models/user.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';

import { z } from 'zod/v4';

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

// GET: Retrieve current user profile
userRegistry.registerPath({
  method: 'get',
  path: `/users/me`,
  tags: ['Users'],
  request: {},
  responses: createApiResponse(userSchema, 'Success'),
});

userRouter.get('/me', userController.getMe);

// GET: Retrieve specific user by ID
userRegistry.registerPath({
  method: 'get',
  path: `/users/{id}`,
  tags: ['Users'],
  request: {
    params: GetUserByIdSchema.shape.params,
  },
  responses: createApiResponse(userSchema, 'Success'),
});

userRouter.get('/:id', validateRequest(GetUserByIdSchema), userController.getUserById);

// POST: Create new user account
userRegistry.registerPath({
  method: 'post',
  path: `/users`,
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(userSchema, 'Success'),
});

userRouter.post('/', validateRequest(CreateUserSchema), userController.createUser);

// POST: Verify user password
userRegistry.registerPath({
  method: 'post',
  path: `/users/verify-password`,
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VerifyPasswordSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.object({ isValid: z.boolean() }), 'Success'),
});

userRouter.post('/verify-password', validateRequest(VerifyPasswordSchema), userController.verifyPassword);
