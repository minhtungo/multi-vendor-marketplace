import { cartController } from '@/controllers/cart.controller';
import { cartSchema, cartUpdateSchema } from '@/models/cart.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { type Router } from 'express';
import { z } from 'zod/v4';

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = express.Router();

// Get cart - Returns current user's cart or creates a new one
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

// Merge cart - Merges guest cart with user cart when user logs in
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

// Update cart - Updates cart information (shipping, billing, etc.)
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
          schema: cartUpdateSchema,
        },
      },
    },
  },
  responses: createApiResponse(cartSchema, 'Cart updated successfully'),
});

cartRouter.put('/', validateRequest(z.object({ body: cartUpdateSchema })), cartController.updateCart);

//TODO: add validation for complete cart
// Clear cart
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

// Delete cart
cartRegistry.registerPath({
  method: 'delete',
  path: '/cart/{id}',
  tags: ['Cart'],
  summary: 'Delete cart',
  description: 'Completely removes a cart and all its items.',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: createApiResponse(z.null(), 'Cart deleted successfully'),
});

cartRouter.delete(
  '/:id',
  validateRequest(z.object({ params: z.object({ id: z.string() }) })),
  cartController.deleteCart
);
