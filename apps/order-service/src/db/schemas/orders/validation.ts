import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { orders } from './orders';

export const insertOrderSchema = createInsertSchema(orders);
export const orderSchema = createSelectSchema(orders);

export type InsertOrder = typeof orders.$inferInsert;
export type Order = typeof orders.$inferSelect;
