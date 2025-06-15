import { cartItemController } from '@/controllers/cart-item.controller';
import {
  AddItemToCartSchema,
  cartItemSchema,
  RemoveCartItemSchema,
  UpdateCartItemSchema,
} from '@/models/cart-item.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import express, { Router } from 'express';
import { z } from 'zod/v4';

export const cartItemRegistry = new OpenAPIRegistry();
export const cartItemRouter: Router = express.Router();

// POST: Add new item to cart
cartItemRegistry.registerPath({
  method: 'post',
  path: '/cart/items',
  tags: ['Cart'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddItemToCartSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.array(cartItemSchema), 'Cart created successfully'),
});

cartItemRouter.post('/', validateRequest(AddItemToCartSchema), cartItemController.addItemToCart);

// PUT: Update cart item quantity
cartItemRegistry.registerPath({
  method: 'put',
  path: '/cart/items/{cartItemId}',
  tags: ['Cart'],
  request: {
    params: UpdateCartItemSchema.shape.params,
    body: {
      content: {
        'application/json': {
          schema: UpdateCartItemSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(cartItemSchema, 'Cart item quantity updated successfully'),
});

cartItemRouter.put('/:cartItemId', validateRequest(UpdateCartItemSchema), cartItemController.updateCartItem);

// DELETE: Remove item from cart
cartItemRegistry.registerPath({
  method: 'delete',
  path: '/cart/items/{cartItemId}',
  tags: ['Cart'],
  request: {
    params: RemoveCartItemSchema.shape.params,
  },
  responses: createApiResponse(z.null(), 'Cart item removed successfully'),
});

cartItemRouter.delete('/:cartItemId', validateRequest(RemoveCartItemSchema), cartItemController.removeCartItem);
