import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';
import { createApiResponse } from '@repo/server/docs';
import { orderSchema, insertOrderSchema } from '@/db/schemas/orders/validation';
import { orderController } from '@/controllers/order.controller';

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = Router();

// Get All Orders Route with Pagination
orderRegistry.registerPath({
  method: 'get',
  path: '/',
  tags: ['Orders'],
  request: {
    query: z.object({
      page: z.string().transform(Number).default('1'),
      limit: z.string().transform(Number).default('20'),
    }),
  },
  responses: createApiResponse(
    z.object({
      orders: z.array(orderSchema),
      pagination: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
      }),
    }),
    'Orders retrieved successfully'
  ),
});

orderRouter.get('/', orderController.getAllOrders);

// Get Order by ID Route
orderRegistry.registerPath({
  method: 'get',
  path: '/orders/:id',
  tags: ['Orders'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(orderSchema, 'Order retrieved successfully'),
});

orderRouter.get('/:id', orderController.getOrderById);

// Create Order Route
orderRegistry.registerPath({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertOrderSchema,
        },
      },
    },
  },
  responses: createApiResponse(orderSchema, 'Order created successfully'),
});

orderRouter.post('/', orderController.createOrder);
