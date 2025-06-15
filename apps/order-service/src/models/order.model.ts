import { orders } from '@/db/schemas';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const orderSchema = createSelectSchema(orders);
export const orderInsertSchema = createInsertSchema(orders);
export const orderUpdateSchema = createUpdateSchema(orders);

// Request validation schemas
export const GetAllOrdersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    vendorId: z.string().optional(),
  }),
});

export const GetOrderByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export const CreateOrderSchema = z.object({
  body: orderInsertSchema,
});

export type InsertOrder = z.infer<typeof orderInsertSchema>;
export type Order = z.infer<typeof orderSchema>;
export type GetAllOrdersInput = z.infer<typeof GetAllOrdersSchema>;
export type GetOrderByIdInput = z.infer<typeof GetOrderByIdSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
