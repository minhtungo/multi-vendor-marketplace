import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';
import { createApiResponse } from '@repo/shared-server/docs';
import { orderController } from '@/controllers/order.controller';
import { orderInsertSchema } from '@/models/order.model';
import { validateRequest } from '@repo/shared-server/middlewares';

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
      total: z.number(),
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
  responses: createApiResponse(z.object({}), 'Order retrieved successfully'),
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
          schema: orderInsertSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Order created successfully'),
});

orderRouter.post('/', validateRequest(orderInsertSchema), orderController.createOrder);
