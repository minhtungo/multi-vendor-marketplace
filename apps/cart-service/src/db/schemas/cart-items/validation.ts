import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { cartItems } from './cart-items';

export const insertCartItemSchema = createInsertSchema(cartItems);
export const cartItemSchema = createSelectSchema(cartItems);

export type InsertCartItem = typeof cartItems.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
