import { cartItems } from '@/db/schemas';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const insertCartItemSchema = createInsertSchema(cartItems).extend({
  cartId: z.string().optional(),
});
export const updateCartItemSchema = createUpdateSchema(cartItems);
export const cartItemSchema = createSelectSchema(cartItems);

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
