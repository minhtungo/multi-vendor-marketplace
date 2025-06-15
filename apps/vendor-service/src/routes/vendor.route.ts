import { vendorController } from '@/controllers/vendor.controller';
import {
  GetVendorByEmailSchema,
  GetVendorByIdSchema,
  vendorSchema,
  VerifyPasswordRequestSchema,
} from '@/models/vendor.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';
import z from 'zod/v4';

export const vendorRegistry = new OpenAPIRegistry();
export const vendorRouter: Router = express.Router();

// GET: Retrieve vendor information by ID
vendorRegistry.registerPath({
  method: 'get',
  path: '/{id}',
  tags: ['Vendor'],
  request: {
    params: GetVendorByIdSchema.shape.params,
  },
  responses: createApiResponse(vendorSchema, 'Success'),
});

vendorRouter.get('/:id', validateRequest(GetVendorByIdSchema), vendorController.getVendorById);

// GET: Retrieve vendor information by email address
vendorRegistry.registerPath({
  method: 'get',
  path: '/email/{email}',
  tags: ['Vendor'],
  request: {
    params: GetVendorByEmailSchema.shape.params,
  },
  responses: createApiResponse(vendorSchema, 'Success'),
});

vendorRouter.get('/email/:email', validateRequest(GetVendorByEmailSchema), vendorController.getVendorByEmail);

// POST: Verify vendor password for authentication
vendorRegistry.registerPath({
  method: 'post',
  path: '/verify-password',
  tags: ['Vendor'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VerifyPasswordRequestSchema.shape.body,
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

vendorRouter.post('/verify-password', validateRequest(VerifyPasswordRequestSchema), vendorController.verifyPassword);
