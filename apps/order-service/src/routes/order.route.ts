import { orderController } from '@/controllers/order.controller';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = Router();

orderRegistry.registerPath({
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

orderRouter.post('/create-connect-link', orderController.createStripeConnectLink);
