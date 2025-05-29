import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';
import { createApiResponse } from '@repo/server/docs';
import { cartSchema, insertCartSchema } from '@/db/schemas/cart/validation';
import { cartController } from '@/controllers/cart.controller';

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = Router();

// Get All Orders Route with Pagination
cartRegistry.registerPath({
  method: 'get',
  path: '/',
  tags: ['Cart'],
  request: {
    query: z.object({
      page: z.string().transform(Number).default('1'),
      limit: z.string().transform(Number).default('20'),
    }),
  },
  responses: createApiResponse(
    z.object({
      cart: z.array(cartSchema),
      total: z.number(),
    }),
    'Cart retrieved successfully'
  ),
});

cartRouter.get('/', cartController.getAllCarts);
