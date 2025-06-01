import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const addToCartItemSchema = z.object({
  productId: z.string(),
  productName: z.string().optional(),
  productImage: z.string().optional(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  total: z.coerce.number(),
});

export type AddToCartItem = z.infer<typeof addToCartItemSchema>;
