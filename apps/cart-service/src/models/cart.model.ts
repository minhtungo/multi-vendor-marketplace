import { cartItemSchema } from '@/db/schemas/cart-items/validation';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  items: z.array(cartItemSchema),
});
