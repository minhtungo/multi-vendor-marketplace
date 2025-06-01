import { cartItems } from '@/db/schemas';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const cartItemInsertSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productImage: z.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  total: z.coerce.number(),
});

export const cartItemUpdateSchema = cartItemInsertSchema.partial();

export type CartItemInsert = z.infer<typeof cartItemInsertSchema>;
export type CartItemUpdate = z.infer<typeof cartItemUpdateSchema>;
export type CartItem = typeof cartItems.$inferSelect;
