import { paths } from '@/configs/paths';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyEmailSchema,
} from '@/models/auth.model';
import {
  handleForgotPassword,
  handleRefreshToken,
  handleResetPassword,
  handleSignIn,
  handleSignOut,
  handleSignUp,
  handleVerifyEmail,
} from '@/controllers/auth.controller';
import { validateRequest } from '@/utils/http-handlers';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import z from 'zod';

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signUp}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignUpSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(
  paths.signUp,
  validateRequest(z.object({ body: SignUpSchema })),
  handleSignUp
);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signIn}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignInSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(
  paths.signIn,
  validateRequest(z.object({ body: SignInSchema })),
  handleSignIn
);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.forgotPassword}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ForgotPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(
  paths.forgotPassword,
  validateRequest(z.object({ body: ForgotPasswordSchema })),
  handleForgotPassword
);

authRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.verifyEmail}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VerifyEmailSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.put(
  paths.verifyEmail,
  validateRequest(z.object({ body: VerifyEmailSchema })),
  handleVerifyEmail
);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.resetPassword}`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ResetPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

authRouter.post(
  paths.resetPassword,
  validateRequest(z.object({ body: ResetPasswordSchema })),
  handleResetPassword
);

authRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.refreshToken}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.put(paths.refreshToken, handleRefreshToken);

authRegistry.registerPath({
  method: 'post',
  path: `/auth/${paths.signOut}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authRouter.post(paths.signOut, handleSignOut);
