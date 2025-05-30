import { cartItemController } from '@/controllers/cart-item.controller';
import { cartController } from '@/controllers/cart.controller';
import { cartSchema, insertCartSchema } from '@/db/schemas/cart/validation';
import { cartItemSchema, updateCartItemQuantitySchema } from '@/db/schemas/cart-items/validation';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import express, { Router } from 'express';
import { z } from 'zod';

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
          schema: insertCartSchema,
        },
      },
    },
  },
  responses: createApiResponse(cartSchema, 'Cart created successfully'),
});

cartItemRouter.post('/', validateRequest(z.object({ body: insertCartSchema })), cartItemController.addItemToCart);

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
          schema: updateCartItemQuantitySchema,
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
      body: updateCartItemQuantitySchema,
    })
  ),
  cartItemController.updateCartItemQuantity
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
  responses: createApiResponse(z.object({ success: z.boolean() }), 'Cart item removed successfully'),
});

cartItemRouter.delete(
  '/:cartItemId',
  validateRequest(z.object({ params: z.object({ cartItemId: z.string() }) })),
  cartItemController.removeCartItem
);
