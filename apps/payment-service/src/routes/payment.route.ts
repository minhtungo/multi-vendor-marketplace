import { paymentController } from '@/controllers/payment.controller';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const paymentRegistry = new OpenAPIRegistry();
export const paymentRouter: Router = Router();

paymentRegistry.registerPath({
  method: 'post',
  path: `/create-connect-link`,
  tags: ['Payment'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({}),
        },
      },
    },
  },
  responses: createApiResponse(
    z.object({
      url: z.string().url(),
    }),
    'Success'
  ),
});

paymentRouter.post('/create-connect-link', paymentController.createStripeConnectLink);
