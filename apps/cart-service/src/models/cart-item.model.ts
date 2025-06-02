import { cartItems } from '@/db/schemas';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { commonValidations } from '@repo/shared-server/lib';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const cartItemInsertSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productImage: z.string(),
  price: commonValidations.price,
  quantity: commonValidations.quantity,
});

export const cartItemUpdateSchema = cartItemInsertSchema.partial();

export type CartItemInsert = z.infer<typeof cartItemInsertSchema>;
export type CartItemUpdate = z.infer<typeof cartItemUpdateSchema>;
export type CartItem = typeof cartItems.$inferSelect;
