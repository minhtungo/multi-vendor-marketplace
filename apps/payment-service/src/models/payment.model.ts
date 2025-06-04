import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const createPaymentIntentSchema = z.object({
  amount: z.number(),
  currency: z.string(),
});

export type CreatePaymentIntent = z.infer<typeof createPaymentIntentSchema>;
