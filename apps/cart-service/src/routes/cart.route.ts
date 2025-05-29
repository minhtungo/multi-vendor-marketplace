import { cartController } from '@/controllers/cart.controller';
import { cartSchema, insertCartSchema, updateCartSchema } from '@/db/schemas/cart/validation';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import express, { type Router } from 'express';
import { z } from 'zod';

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = express.Router();

// Create cart
cartRegistry.registerPath({
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

cartRouter.post('/', validateRequest(z.object({ body: insertCartSchema })), cartController.createCart);

// Update cart
cartRegistry.registerPath({
  method: 'put',
  path: '/cart/{id}',
  tags: ['Cart'],
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateCartSchema,
        },
      },
    },
  },
  responses: createApiResponse(cartSchema, 'Cart updated successfully'),
});

cartRouter.put(
  '/:id',
  validateRequest(z.object({ params: z.object({ id: z.string() }), body: updateCartSchema })),
  cartController.updateCart
);

// Get cart by user ID
cartRegistry.registerPath({
  method: 'get',
  path: '/cart/user/{userId}',
  tags: ['Cart'],
  request: {
    params: z.object({
      userId: z.string().uuid(),
    }),
  },
  responses: createApiResponse(cartSchema, 'Cart retrieved successfully'),
});

cartRouter.get(
  '/user/:userId',
  validateRequest(z.object({ params: z.object({ userId: z.string().uuid() }) })),
  cartController.getCartByUserId
);

// Get cart by cart ID
cartRegistry.registerPath({
  method: 'get',
  path: '/cart/{id}',
  tags: ['Cart'],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: createApiResponse(cartSchema, 'Cart retrieved successfully'),
});

cartRouter.get('/:id', validateRequest(z.object({ params: z.object({ id: z.string() }) })), cartController.getCartById);

// Get cart by session ID (for guest users)
cartRegistry.registerPath({
  method: 'get',
  path: '/cart/session/{sessionId}',
  tags: ['Cart'],
  request: {
    params: z.object({
      sessionId: z.string(),
    }),
  },
  responses: createApiResponse(cartSchema, 'Cart retrieved successfully'),
});

cartRouter.get(
  '/session/:sessionId',
  validateRequest(z.object({ params: z.object({ sessionId: z.string() }) })),
  cartController.getCartBySessionId
);
