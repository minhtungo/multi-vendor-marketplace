import { vendorController } from '@/controllers/vendor.controller';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';
import z from 'zod';

export const vendorRegistry = new OpenAPIRegistry();
export const vendorRouter: Router = express.Router();

// Get vendor by ID
vendorRegistry.registerPath({
  method: 'get',
  path: '/{id}',
  tags: ['Vendor'],
  responses: createApiResponse(
    z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
    }),
    'Success'
  ),
});

vendorRouter.get('/:id', vendorController.getVendorById);

// Get vendor by email
vendorRegistry.registerPath({
  method: 'get',
  path: '/email/{email}',
  tags: ['Vendor'],
  responses: createApiResponse(
    z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      // Add other vendor fields as needed
    }),
    'Success'
  ),
});

vendorRouter.get('/email/:email', vendorController.getVendorByEmail);

// Verify vendor password
vendorRegistry.registerPath({
  method: 'post',
  path: '/verify-password',
  tags: ['Vendor'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            password: z.string(),
          }),
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
  // validateRequest(
  //   z.object({
  //     email: z.string().email(),
  //     password: z.string(),
  //   })
  // ),
  vendorController.verifyPassword
);
