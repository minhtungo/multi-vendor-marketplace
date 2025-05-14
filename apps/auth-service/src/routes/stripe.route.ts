import { stripeController } from '@/controllers/stripe.controller';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import assertUserAuthentication from '@/middlewares/assertAuthentication';
import { CreateConnectLinkSchema } from '@/models/stripe.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const stripeRegistry = new OpenAPIRegistry();
export const stripeRouter: Router = Router();

stripeRegistry.registerPath({
  method: 'post',
  path: '/stripe/connect-link',
  tags: ['Stripe'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateConnectLinkSchema,
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

stripeRouter.post(
  '/connect-link',
  assertUserAuthentication,
  // validateRequest(z.object({ body: CreateConnectLinkSchema })),
  stripeController.createStripeConnectLink
);
