import { paymentController } from '@/controllers/payment.controller';
import { createPaymentIntentSchema } from '@/models/payment.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { Router } from 'express';
import { z } from 'zod';

export const paymentRegistry = new OpenAPIRegistry();
export const paymentRouter: Router = Router();

// Create a connect link for the vendor to connect their stripe account
paymentRegistry.registerPath({
  method: 'post',
  path: '/create-connect-link',
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

// Create a payment intent
paymentRegistry.registerPath({
  method: 'post',
  path: '/create-payment-intent',
  tags: ['Payment'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createPaymentIntentSchema,
        },
      },
    },
  },
  responses: createApiResponse(
    z.object({
      clientSecret: z.string(),
      id: z.string(),
    }),
    'Success'
  ),
});

paymentRouter.post('/create-payment-intent', paymentController.createPaymentIntent);
