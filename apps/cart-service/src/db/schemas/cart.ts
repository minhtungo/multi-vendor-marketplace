import { relations } from 'drizzle-orm';
import { decimal, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { CART_STATUS, cartStatus } from '../constants';
import { cartItems } from '@/db/schemas/cart-items';

export const cart = pgTable(
  'cart',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: uuid('user_id'),
    status: cartStatus().notNull().default(CART_STATUS.ACTIVE),
    sessionId: text('session_id'),
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull().default('0.00'),
    total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0.00'),
    itemCount: integer('item_count').default(0),

    // Shipping Address
    shippingFirstName: text('shipping_first_name'),
    shippingLastName: text('shipping_last_name'),
    shippingAddressLine1: text('shipping_address_line_1'),
    shippingCity: text('shipping_city'),
    shippingState: text('shipping_state'),
    shippingPostalCode: text('shipping_postal_code'),

    // Billing Address
    billingFirstName: text('billing_first_name'),
    billingLastName: text('billing_last_name'),
    billingAddressLine1: text('billing_address_line_1'),
    billingCity: text('billing_city'),
    billingState: text('billing_state'),
    billingPostalCode: text('billing_postal_code'),

    // Shipping Method
    shippingMethodName: text('shipping_method_name'),
    shippingMethodId: text('shipping_method_id'),
    shippingMethodPrice: decimal('shipping_method_price', { precision: 10, scale: 2 }),

    email: text(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [
    index('cart_user_id_index').on(t.userId),
    index('cart_status_index').on(t.status),
    index('cart_session_id_index').on(t.sessionId),
  ]
);

export const cartRelations = relations(cart, ({ many }) => ({
  items: many(cartItems),
}));
