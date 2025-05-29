import { decimal, integer, jsonb, pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { cart } from '@/db/schemas/cart/cart';

export const cartItems = pgTable(
  'cart_items',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    cartId: text('cart_id')
      .notNull()
      .references(() => cart.id, { onDelete: 'cascade' }),
    productId: text('product_id').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    quantity: integer('quantity').notNull().default(1),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [index('cart_items_cart_id_index').on(t.cartId), index('cart_items_product_id_index').on(t.productId)]
);

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id],
  }),
}));
