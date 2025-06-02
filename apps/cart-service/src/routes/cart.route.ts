import { cartController } from '@/controllers/cart.controller';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';
import { z } from 'zod';

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = express.Router();

// Get cart
cartRegistry.registerPath({
  method: 'get',
  path: '/cart',
  tags: ['Cart'],
  responses: createApiResponse(z.object({}), 'Cart retrieved successfully'),
});

cartRouter.get('/', cartController.getCart);

// Merge cart
cartRegistry.registerPath({
  method: 'post',
  path: '/cart/merge',
  tags: ['Cart'],
  request: {},
  responses: createApiResponse(z.object({}), 'Cart merged successfully'),
});

cartRouter.post('/merge', cartController.mergeCart);

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
