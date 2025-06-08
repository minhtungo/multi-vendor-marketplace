import { orders } from '@/db/schemas';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const orderSchema = createSelectSchema(orders);

export const orderInsertSchema = z.object({
  orderNumber: z.string().min(1),
  customerId: z.string().min(1),
  vendorId: z.string().min(1),
  totalAmount: z.string().min(1),
  currency: z.string().min(1),
  discountCodeId: z.string().min(1).optional(),
  discountAmount: z.string().min(1).optional(),
  shippingFirstName: z.string().min(1),
  shippingLastName: z.string().min(1),
  shippingAddressLine1: z.string().min(1),
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingPostalCode: z.string().min(1),
  billingFirstName: z.string().min(1),
  billingLastName: z.string().min(1),
  billingAddressLine1: z.string().min(1),
  billingCity: z.string().min(1),
  billingState: z.string().min(1),
  billingPostalCode: z.string().min(1),
  notes: z.string().min(1).optional(),
  paymentMethod: z.string().min(1),
});

export type InsertOrder = z.infer<typeof orderInsertSchema>;
export type Order = z.infer<typeof orderSchema>;
