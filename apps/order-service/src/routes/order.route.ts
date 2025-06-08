import { orderController } from '@/controllers/order.controller';
import { orderInsertSchema, orderSchema } from '@/models/order.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import { Router } from 'express';
import { z } from 'zod/v4';

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = Router();

// Get All Orders Route with Pagination
orderRegistry.registerPath({
  method: 'get',
  path: '/',
  tags: ['Orders'],
  request: {
    query: z.object({
      page: z.string().transform(Number).default(1),
      limit: z.string().transform(Number).default(20),
    }),
  },
  responses: createApiResponse(
    z.object({
      orders: z.array(orderSchema),
      count: z.number(),
    }),
    'Orders retrieved successfully'
  ),
});

orderRouter.get(
  '/',
  validateRequest(
    z.object({
      query: z.object({
        page: z.string().transform(Number).default(1),
        limit: z.string().transform(Number).default(20),
      }),
    })
  ),
  orderController.getAllOrders
);

// Get Order by ID Route
orderRegistry.registerPath({
  method: 'get',
  path: '/orders/:id',
  tags: ['Orders'],
  request: {
    params: z.object({
      id: z.uuid(),
    }),
  },
  responses: createApiResponse(orderSchema, 'Order retrieved successfully'),
});

orderRouter.get(
  '/:id',
  validateRequest(z.object({ params: z.object({ id: z.uuid() }) })),
  orderController.getOrderById
);

// Create Order Route
orderRegistry.registerPath({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: orderInsertSchema,
        },
      },
    },
  },
  responses: createApiResponse(orderSchema, 'Order created successfully'),
});

orderRouter.post('/', validateRequest(z.object({ body: orderInsertSchema })), orderController.createOrder);
