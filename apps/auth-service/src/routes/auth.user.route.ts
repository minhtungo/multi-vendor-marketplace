import { paths } from '@/configs/paths';
import { authUserController } from '@/controllers/auth.user.controller';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { assertUserAuthentication } from '@/middlewares/assertAuthentication';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyUserSchema,
} from '@/models/auth.user.model';
import { tokenRepository } from '@/repositories/token.repository';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { validateRequest } from '@repo/server/lib/http-handlers';
import express, { NextFunction, Request, Response, type Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import z from 'zod';

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
          schema: SignUpSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authUserRouter.post(paths.signUp, validateRequest(z.object({ body: SignUpSchema })), authUserController.signUp);

authUserRegistry.registerPath({
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

authUserRouter.post(paths.signIn, validateRequest(z.object({ body: SignInSchema })), authUserController.signIn);

authUserRegistry.registerPath({
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

authUserRouter.post(
  paths.forgotPassword,
  validateRequest(z.object({ body: ForgotPasswordSchema })),
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
          schema: VerifyUserSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

authUserRouter.put(
  paths.verifyUser,
  validateRequest(z.object({ body: VerifyUserSchema })),
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
          schema: ResetPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

authUserRouter.post(
  paths.resetPassword,
  validateRequest(z.object({ body: ResetPasswordSchema })),
  authUserController.resetPassword
);

authUserRegistry.registerPath({
  method: 'put',
  path: `/auth/${paths.renewToken}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
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
  responses: createApiResponse(z.null(), 'Success'),
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
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token } = req.params;
      const existingToken = await tokenRepository.getResetPasswordTokenByToken(token);

      if (!existingToken || existingToken.expires < new Date()) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Invalid or expired token',
          data: null,
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Token is valid',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
