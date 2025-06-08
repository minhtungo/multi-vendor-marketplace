import { vendorController } from '@/controllers/vendor.controller';
import { vendorSchema, verifyPasswordSchema } from '@/models/vendor.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';
import z from 'zod/v4';

export const vendorRegistry = new OpenAPIRegistry();
export const vendorRouter: Router = express.Router();

// Get vendor by ID
vendorRegistry.registerPath({
  method: 'get',
  path: '/{id}',
  tags: ['Vendor'],
  responses: createApiResponse(vendorSchema, 'Success'),
});

vendorRouter.get(
  '/:id',
  validateRequest(z.object({ params: z.object({ id: z.string() }) })),
  vendorController.getVendorById
);

// Get vendor by email
vendorRegistry.registerPath({
  method: 'get',
  path: '/email/{email}',
  tags: ['Vendor'],
  responses: createApiResponse(vendorSchema, 'Success'),
});

vendorRouter.get(
  '/email/:email',
  validateRequest(z.object({ params: z.object({ email: z.email() }) })),
  vendorController.getVendorByEmail
);

// Verify vendor password
vendorRegistry.registerPath({
  method: 'post',
  path: '/verify-password',
  tags: ['Vendor'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: verifyPasswordSchema,
        },
      },
    },
  },
  responses: createApiResponse(
    z.object({
      isValid: z.boolean(),
    }),
    'Success'
  ),
});

vendorRouter.post(
  '/verify-password',
  validateRequest(
    z.object({
      body: verifyPasswordSchema,
    })
  ),
  vendorController.verifyPassword
);
