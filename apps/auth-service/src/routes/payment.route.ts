import { paymentPaths } from '@/configs/paths';
import { paymentController } from '@/controllers/payment.controller';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { assertVendorAuthentication } from '@/middlewares/assertAuthentication';
import { CreateConnectLinkSchema } from '@/models/stripe.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const paymentRegistry = new OpenAPIRegistry();
export const paymentRouter: Router = Router();

paymentRegistry.registerPath({
  method: 'post',
  path: `/vendor/payment/${paymentPaths.createConnectLink}`,
  tags: ['Payment'],
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

paymentRouter.post(
  paymentPaths.createConnectLink,
  assertVendorAuthentication,
  // validateRequest(z.object({ body: CreateConnectLinkSchema })),
  paymentController.createStripeConnectLink
);
