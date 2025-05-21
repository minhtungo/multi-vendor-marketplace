import { vendorController } from '@/controllers/vendor.controller';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import express, { type Router } from 'express';
import z from 'zod';

export const vendorRegistry = new OpenAPIRegistry();
export const vendorRouter: Router = express.Router();

vendorRegistry.registerPath({
  method: 'get',
  path: '/',
  tags: ['Vendor'],
  responses: createApiResponse(z.null(), 'Success'),
});

vendorRouter.get('/', vendorController.getVendor);
