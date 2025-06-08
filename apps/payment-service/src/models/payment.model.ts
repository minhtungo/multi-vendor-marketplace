import { z } from 'zod/v4';

export const createPaymentIntentSchema = z.object({
  amount: z.string(),
  currency: z.string(),
});

export type CreatePaymentIntent = z.infer<typeof createPaymentIntentSchema>;
