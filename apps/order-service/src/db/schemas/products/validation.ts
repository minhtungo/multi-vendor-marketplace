import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { orders } from './orders';
import { discountCodes } from './discount-codes';
import { z } from 'zod';

export const insertOrderSchema = createInsertSchema(orders);
export const orderSchema = createSelectSchema(orders);

export const insertDiscountCodeSchema = createInsertSchema(discountCodes, {
  type: z.enum(['percentage', 'fixed']),
  value: z.number().positive(),
  startDate: z.date(),
  endDate: z.date(),
  minOrderAmount: z.number().positive().optional(),
  maxUses: z.number().positive().optional(),
});

export const discountCodeSchema = createSelectSchema(discountCodes);

export type InsertOrder = typeof orders.$inferInsert;
export type Order = typeof orders.$inferSelect;
