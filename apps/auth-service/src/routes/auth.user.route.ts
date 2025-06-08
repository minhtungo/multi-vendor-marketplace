import { paths } from '@/configs/paths';
import { authUserController } from '@/controllers/auth.user.controller';
import { assertUserAuthentication } from '@/middlewares/assertAuthentication';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  userSchema,
  verifyUserSchema,
} from '@/models/auth.user.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';

import z from 'zod/v4';

export const authUserRegistry = new OpenAPIRegistry();
export const authUserRouter: Router = express.Router();

authUserRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signUp}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: signUpSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authUserRouter.post(paths.signUp, validateRequest(z.object({ body: signUpSchema })), authUserController.signUp);

authUserRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signIn}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: signInSchema,
        },
      },
    },
  },
  responses: createApiResponse(userSchema, 'Success'),
});

authUserRouter.post(paths.signIn, validateRequest(z.object({ body: signInSchema })), authUserController.signIn);

authUserRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.forgotPassword}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: forgotPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authUserRouter.post(
  paths.forgotPassword,
  validateRequest(z.object({ body: forgotPasswordSchema })),
  authUserController.forgotPassword
);

authUserRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.verifyUser}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: verifyUserSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authUserRouter.put(
  paths.verifyUser,
  validateRequest(z.object({ body: verifyUserSchema })),
  authUserController.verifyUser
);

authUserRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.resetPassword}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: resetPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

authUserRouter.post(
  paths.resetPassword,
  validateRequest(z.object({ body: resetPasswordSchema })),
  authUserController.resetPassword
);

authUserRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.renewToken}`,
  tags: ['Auth'],
  responses: createApiResponse(
    z.object({
      accessToken: z.string(),
      user: userSchema,
    }),
    'Success'
  ),
});

authUserRouter.put(paths.renewToken, authUserController.renewToken);

authUserRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signOut}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authUserRouter.post(paths.signOut, authUserController.signOut);

authUserRegistry.registerPath({
  method: 'get',
  path: `/auth/${paths.me}`,
  tags: ['Auth'],
  responses: createApiResponse(userSchema, 'Success'),
});

authUserRouter.get(paths.me, assertUserAuthentication, authUserController.getMe);

authUserRegistry.registerPath({
  method: 'get',
  path: `/auth/${paths.resetPassword}/verify/:token`,
  tags: ['Auth'],
  request: {
    params: z.object({
      token: z.string(),
    }),
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

authUserRouter.get(
  `${paths.resetPassword}/verify/:token`,
  validateRequest(z.object({ params: z.object({ token: z.string() }) })),
  authUserController.verifyResetPasswordToken
);
