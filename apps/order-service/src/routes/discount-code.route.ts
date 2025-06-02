import { discountCodeController } from '@/controllers/discount-code.controller';
import { discountCodeSchema, insertDiscountCodeSchema } from '@/db/schemas';
import { createApiResponse } from '@repo/shared-server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const discountCodeRegistry = new OpenAPIRegistry();
export const discountCodeRouter: Router = Router();

// Create Discount Code Route
discountCodeRegistry.registerPath({
  method: 'post',
  path: '/discount-codes',
  tags: ['Discount Codes'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertDiscountCodeSchema,
        },
      },
    },
  },
  responses: createApiResponse(discountCodeSchema, 'Discount code created successfully'),
});

discountCodeRouter.post('/', discountCodeController.createDiscountCode);

// Delete Discount Code Route
discountCodeRegistry.registerPath({
  method: 'delete',
  path: '/discount-codes/:id',
  tags: ['Discount Codes'],
  request: {
    params: z.object({
      id: z.string().transform(Number),
    }),
  },
  responses: createApiResponse(discountCodeSchema, 'Discount code deleted successfully'),
});

discountCodeRouter.delete('/:id', discountCodeController.deleteDiscountCode);
