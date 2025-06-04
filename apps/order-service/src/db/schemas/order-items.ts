import { decimal, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { orders } from './orders';

export const orderItems = pgTable('order_items', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),

  productId: text('product_id').notNull(), // Reference to product in product service
  productName: varchar('product_name', { length: 255 }).notNull(),

  // Pricing information at time of purchase
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
