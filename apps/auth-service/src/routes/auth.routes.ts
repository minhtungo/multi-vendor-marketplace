import { paths } from '@/configs/paths';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { SignUpSchema } from '@/models/auth.model';
import { handleSignUp } from '@/controllers/auth.controller';
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
