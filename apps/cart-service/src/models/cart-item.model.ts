import { cartItems } from '@/db/schemas';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const insertCartItemSchema = createInsertSchema(cartItems).extend({
  cartId: z.string().optional(),
});
export const updateCartItemSchema = createUpdateSchema(cartItems);
export const cartItemSchema = createSelectSchema(cartItems);

// Request validation schemas
export const AddItemToCartSchema = z.object({
  body: insertCartItemSchema,
});

export const UpdateCartItemSchema = z.object({
  params: z.object({
    cartItemId: z.string(),
  }),
  body: updateCartItemSchema,
});

export const RemoveCartItemSchema = z.object({
  params: z.object({
    cartItemId: z.string(),
  }),
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type AddItemToCartInput = z.infer<typeof AddItemToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>;
export type RemoveCartItemInput = z.infer<typeof RemoveCartItemSchema>;
