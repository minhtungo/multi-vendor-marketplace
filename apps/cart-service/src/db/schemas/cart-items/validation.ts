import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { cartItems } from './cart-items';
import { z } from 'zod';

export const insertCartItemSchema = createInsertSchema(cartItems);
export const updateCartItemSchema = insertCartItemSchema.partial();
export const updateCartItemQuantitySchema = z.object({
  quantity: z.number().int().positive().min(1),
});
export const cartItemSchema = createSelectSchema(cartItems);

export type InsertCartItem = typeof cartItems.$inferInsert;
export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
export type UpdateCartItemQuantity = z.infer<typeof updateCartItemQuantitySchema>;
export type CartItem = typeof cartItems.$inferSelect;
