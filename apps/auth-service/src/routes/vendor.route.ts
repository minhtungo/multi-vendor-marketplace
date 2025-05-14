import { paths as vendorPaths } from '@/configs/paths';
import { shopController } from '@/controllers/shop.controller';
import { vendorController } from '@/controllers/vendor.controller';
import { insertShopSchema } from '@/db/schemas/shops';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import assertVendorAuthentication from '@/middlewares/assertVendorAuthentication';
import { VendorSignInSchema, VendorSignUpSchema, VerifyVendorSchema } from '@/models/vendor.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { validateRequest } from '@repo/server/lib/http-handlers';
import express, { type Router } from 'express';
import z from 'zod';

export const vendorRegistry = new OpenAPIRegistry();
export const vendorRouter: Router = express.Router();

vendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/signup`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VendorSignUpSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

vendorRouter.post(vendorPaths.signUp, validateRequest(z.object({ body: VendorSignUpSchema })), vendorController.signUp);

vendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/sign-in`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VendorSignUpSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

vendorRouter.post(vendorPaths.signIn, validateRequest(z.object({ body: VendorSignInSchema })), vendorController.signIn);

vendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/verify`,
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: VerifyVendorSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

vendorRouter.post(
  vendorPaths.verifyUser,
  validateRequest(z.object({ body: VerifyVendorSchema })),
  vendorController.verifyVendor
);

vendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/shops`,
  tags: ['Shops'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertShopSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Success'),
});

vendorRouter.post(
  '/shops',
  validateRequest(z.object({ body: insertShopSchema })),
  assertVendorAuthentication,
  shopController.createShop
);
