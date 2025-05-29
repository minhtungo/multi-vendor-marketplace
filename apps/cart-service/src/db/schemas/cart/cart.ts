import { relations } from 'drizzle-orm';
import { decimal, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { cartItems } from '../cart-items';
import { CART_STATUS, cartStatus } from '../constants';

export const cart = pgTable(
  'cart',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: uuid('user_id').notNull(),
    status: cartStatus().notNull().default(CART_STATUS.ACTIVE),
    sessionId: text('session_id'), // for guest users
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull().default('0.00'),
    total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0.00'),
    currency: text('currency').notNull().default('USD'),
    itemCount: integer('item_count').default(0),
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
