import { cartItemController } from '@/controllers/cart-item.controller';
import { cartItemSchema, insertCartItemSchema, updateCartItemSchema } from '@/models/cart-item.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { Router } from 'express';
import { z } from 'zod/v4';

export const cartItemRegistry = new OpenAPIRegistry();
export const cartItemRouter: Router = express.Router();

// Add item to cart
cartItemRegistry.registerPath({
  method: 'post',
  path: '/cart/items',
  tags: ['Cart'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertCartItemSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.array(cartItemSchema), 'Cart created successfully'),
});

cartItemRouter.post('/', validateRequest(z.object({ body: insertCartItemSchema })), cartItemController.addItemToCart);

// Update cart item quantity
cartItemRegistry.registerPath({
  method: 'patch',
  path: '/cart/items/{cartItemId}',
  tags: ['Cart'],
  request: {
    params: z.object({
      cartItemId: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateCartItemSchema,
        },
      },
    },
  },
  responses: createApiResponse(cartItemSchema, 'Cart item quantity updated successfully'),
});

cartItemRouter.patch(
  '/:cartItemId',
  validateRequest(
    z.object({
      params: z.object({ cartItemId: z.string() }),
      body: updateCartItemSchema,
    })
  ),
  cartItemController.updateCartItem
);

// Remove cart item
cartItemRegistry.registerPath({
  method: 'delete',
  path: '/cart/items/{cartItemId}',
  tags: ['Cart'],
  request: {
    params: z.object({
      cartItemId: z.string(),
    }),
  },
  responses: createApiResponse(z.null(), 'Cart item removed successfully'),
});

cartItemRouter.delete(
  '/:cartItemId',
  validateRequest(z.object({ params: z.object({ cartItemId: z.string() }) })),
  cartItemController.removeCartItem
);
