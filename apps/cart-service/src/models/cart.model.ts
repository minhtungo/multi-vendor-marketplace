import { cart } from '@/db/schemas';
import { CART_STATUS } from '@/db/schemas/constants';
import { CartItem } from '@/models/cart-item.model';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { commonValidations } from '@repo/shared-server/lib';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const cartInsertSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  status: z.nativeEnum(CART_STATUS).optional(),
  subtotal: commonValidations.price.optional(),
  total: commonValidations.price.optional(),
  itemCount: commonValidations.quantity.optional(),
  email: z.string().email().optional(),
});

// TODO: improve validation
export const cartUpdateSchema = cartInsertSchema.partial().extend({
  email: z.string().email().optional(),
  shippingAddress: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      address1: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  billingAddress: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      address1: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  shippingMethod: z
    .object({
      name: z.string(),
      id: z.string(),
      price: commonValidations.price,
    })
    .optional(),
});

export type CartInsert = z.infer<typeof cartInsertSchema>;
export type CartUpdate = z.infer<typeof cartUpdateSchema>;
export type Cart = typeof cart.$inferSelect;
export type CartWithItems = Cart & { items: CartItem[] };
