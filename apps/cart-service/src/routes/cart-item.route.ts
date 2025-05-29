import { cartController } from '@/controllers/cart.controller';
import { cartSchema, insertCartSchema } from '@/db/schemas/cart/validation';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import express, { Router } from 'express';
import { z } from 'zod';

export const cartItemRegistry = new OpenAPIRegistry();
export const cartItemRouter: Router = express.Router();

// Create cart
cartItemRegistry.registerPath({
  method: 'post',
  path: '/cart',
  tags: ['Cart'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertCartSchema,
        },
      },
    },
  },
  responses: createApiResponse(cartSchema, 'Cart created successfully'),
});

cartItemRouter.post('/', validateRequest(z.object({ body: insertCartSchema })), cartController.createCart);
