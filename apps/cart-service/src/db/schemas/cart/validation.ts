import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { cart } from './cart';

export const insertCartSchema = createInsertSchema(cart);
export const cartSchema = createSelectSchema(cart);

export type InsertCart = typeof cart.$inferInsert;
export type Cart = typeof cart.$inferSelect;
