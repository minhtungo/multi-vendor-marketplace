import { CART_STATUS } from '@/db/schemas/constants';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const cartInsertSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  status: z.nativeEnum(CART_STATUS).optional(),
  subtotal: z.coerce.number().optional(),
  total: z.coerce.number().optional(),
  itemCount: z.coerce.number().optional(),
});

export const cartUpdateSchema = cartInsertSchema.partial();
