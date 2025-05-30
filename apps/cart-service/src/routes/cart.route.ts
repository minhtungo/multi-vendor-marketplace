import { cartController } from '@/controllers/cart.controller';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import express, { type Router } from 'express';
import { z } from 'zod';

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = express.Router();

// Get cart
cartRegistry.registerPath({
  method: 'get',
  path: '/cart',
  tags: ['Cart'],
  // request: {
  //   params: z.object({
  //     sessionId: z.string(),
  //   }),
  // },
  responses: createApiResponse(z.object({}), 'Cart retrieved successfully'),
});

cartRouter.get('/', cartController.getCart);

// Update cart
cartRegistry.registerPath({
  method: 'put',
  path: '/cart/{id}',
  tags: ['Cart'],
  // request: {
  //   params: z.object({
  //     id: z.string(),
  //   }),
  //   body: {
  //     content: {
  //       'application/json': {
  //         schema: updateCartSchema,
  //       },
  //     },
  //   },
  // },
  responses: createApiResponse(z.object({}), 'Cart updated successfully'),
});

cartRouter.put(
  '/:id',
  validateRequest(z.object({ params: z.object({ id: z.string() }), body: z.object({}) })),
  cartController.updateCart
);

// Delete cart
cartRegistry.registerPath({
  method: 'delete',
  path: '/cart/{id}',
  tags: ['Cart'],
  // request: {
  //   params: z.object({
  //     id: z.string(),
  //   }),
  // },
  responses: createApiResponse(z.null(), 'Cart deleted successfully'),
});

cartRouter.delete(
  '/:id',
  validateRequest(z.object({ params: z.object({ id: z.string() }) })),
  cartController.deleteCart
);
