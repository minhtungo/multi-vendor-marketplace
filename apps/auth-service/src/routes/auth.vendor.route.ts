import { vendorPaths } from '@/configs/paths';
import { shopController } from '@/controllers/shop.controller';
import { authVendorController } from '@/controllers/auth.vendor.controller';
import { insertShopSchema } from '@/db/schemas/shops';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { assertVendorAuthentication } from '@/middlewares/assertAuthentication';
import { VendorSignInSchema, VendorSignUpSchema, VerifyVendorSchema } from '@/models/auth.vendor.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { validateRequest } from '@repo/server/lib/http-handlers';
import express, { type Router } from 'express';
import z from 'zod';

export const authVendorRegistry = new OpenAPIRegistry();
export const authVendorRouter: Router = express.Router();

authVendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/${vendorPaths.signUp}`,
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

authVendorRouter.post(
  vendorPaths.signUp,
  validateRequest(z.object({ body: VendorSignUpSchema })),
  authVendorController.signUp
);

authVendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/${vendorPaths.signIn}`,
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

authVendorRouter.post(
  vendorPaths.signIn,
  validateRequest(z.object({ body: VendorSignInSchema })),
  authVendorController.signIn
);

authVendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/${vendorPaths.verify}`,
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

authVendorRouter.post(
  vendorPaths.verify,
  validateRequest(z.object({ body: VerifyVendorSchema })),
  authVendorController.verifyVendor
);

authVendorRegistry.registerPath({
  method: 'put',
  path: `/auth/vendor/${vendorPaths.renewToken}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authVendorRouter.put(vendorPaths.renewToken, authVendorController.renewToken);

authVendorRegistry.registerPath({
  method: 'post',
  path: `/auth/vendor/${vendorPaths.shop}`,
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

authVendorRouter.post(
  vendorPaths.shop,
  validateRequest(z.object({ body: insertShopSchema })),
  assertVendorAuthentication,
  shopController.createShop
);

authVendorRegistry.registerPath({
  method: 'get',
  path: `/auth/vendor/${vendorPaths.me}`,
  tags: ['Auth'],
  responses: createApiResponse(z.null(), 'Success'),
});

authVendorRouter.get(vendorPaths.me, assertVendorAuthentication, authVendorController.getVendor);
