import { cartController } from '@/controllers/cart.controller';
import { cartSchema, DeleteCartSchema, UpdateCartSchema } from '@/models/cart.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';
import { z } from 'zod/v4';

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = express.Router();

// GET: Retrieve current user's cart or create a new one
cartRegistry.registerPath({
  method: 'get',
  path: '/cart',
  tags: ['Cart'],
  summary: 'Get or create cart',
  description:
    "Retrieves the current user's cart or creates a new one if none exists. For authenticated users, it uses userId, for guests it uses sessionId.",
  responses: createApiResponse(cartSchema, 'Cart retrieved successfully'),
});

cartRouter.get('/', cartController.getCart);

// POST: Merge guest cart with user cart when user logs in
cartRegistry.registerPath({
  method: 'post',
  path: '/cart/merge',
  tags: ['Cart'],
  summary: 'Merge guest cart with user cart',
  description:
    "Merges a guest cart with the authenticated user's cart. Used when a user logs in and has items in their guest cart.",
  request: {},
  responses: createApiResponse(cartSchema, 'Cart merged successfully'),
});

cartRouter.post('/merge', cartController.mergeCart);

// POST: Clear all items from cart after order completion
//TODO: add validation for complete cart
cartRegistry.registerPath({
  method: 'post',
  path: '/cart/complete',
  tags: ['Cart'],
  summary: 'Clear cart',
  description:
    'Removes all items from the cart but keeps the cart structure. Useful after an order is successfully created.',
  responses: createApiResponse(z.object({}), 'Cart cleared successfully'),
});

cartRouter.post('/complete', cartController.completeCart);

// PUT: Update cart information (shipping, billing, etc.)
cartRegistry.registerPath({
  method: 'put',
  path: '/cart',
  tags: ['Cart'],
  summary: 'Update cart information',
  description: 'Updates cart information such as email, shipping address, billing address, and shipping method.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateCartSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(cartSchema, 'Cart updated successfully'),
});

cartRouter.put('/', validateRequest(UpdateCartSchema), cartController.updateCart);

// DELETE: Remove cart and all its items completely
cartRegistry.registerPath({
  method: 'delete',
  path: '/cart/{id}',
  tags: ['Cart'],
  summary: 'Delete cart',
  description: 'Completely removes a cart and all its items.',
  request: {
    params: DeleteCartSchema.shape.params,
  },
  responses: createApiResponse(z.null(), 'Cart deleted successfully'),
});

cartRouter.delete('/:id', validateRequest(DeleteCartSchema), cartController.deleteCart);
