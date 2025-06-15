import { orderController } from '@/controllers/order.controller';
import { CreateOrderSchema, GetAllOrdersSchema, GetOrderByIdSchema, orderSchema } from '@/models/order.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import { Router } from 'express';
import { z } from 'zod/v4';

export const orderRegistry = new OpenAPIRegistry();
export const orderRouter: Router = Router();

// GET: Retrieve all orders with pagination
orderRegistry.registerPath({
  method: 'get',
  path: '/',
  tags: ['Orders'],
  request: {
    query: GetAllOrdersSchema.shape.query,
  },
  responses: createApiResponse(
    z.object({
      orders: z.array(orderSchema),
      count: z.number(),
    }),
    'Orders retrieved successfully'
  ),
});

orderRouter.get('/', validateRequest(GetAllOrdersSchema), orderController.getAllOrders);

// GET: Retrieve specific order by ID
orderRegistry.registerPath({
  method: 'get',
  path: '/orders/:id',
  tags: ['Orders'],
  request: {
    params: GetOrderByIdSchema.shape.params,
  },
  responses: createApiResponse(orderSchema, 'Order retrieved successfully'),
});

orderRouter.get('/:id', validateRequest(GetOrderByIdSchema), orderController.getOrderById);

// POST: Create new order from cart
orderRegistry.registerPath({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateOrderSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(orderSchema, 'Order created successfully'),
});

orderRouter.post('/', validateRequest(CreateOrderSchema), orderController.createOrder);
