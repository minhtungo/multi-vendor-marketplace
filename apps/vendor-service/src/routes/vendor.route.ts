import { vendorPaths } from '@/configs/paths';
import { shopController } from '@/controllers/shop.controller';
import { vendorController } from '@/controllers/vendor.controller';
import { insertShopSchema } from '@/db/schemas/shops';
import { VendorSignInSchema, VendorSignUpSchema, VerifyVendorSchema } from '@/models/vendor.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import express, { type Router } from 'express';
import z from 'zod';

export const vendorRegistry = new OpenAPIRegistry();
export const vendorRouter: Router = express.Router();

vendorRegistry.registerPath({
  method: 'get',
  path: `/vendor/${vendorPaths.me}`,
  tags: ['Vendor'],
  responses: createApiResponse(z.null(), 'Success'),
});

vendorRouter.get(vendorPaths.me, vendorController.getVendor);
