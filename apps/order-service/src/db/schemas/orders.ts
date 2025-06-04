import { ORDER_STATUS, PAYMENT_STATUS } from '@/db/constants';
import { decimal, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { discountCodes } from './discount-codes';

export const orders = pgTable('orders', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  customerId: uuid('customer_id').notNull(),
  vendorId: uuid('vendor_id').notNull(),
  orderStatus: text('order_status').default(ORDER_STATUS.PENDING),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  discountCodeId: text('discount_code_id').references(() => discountCodes.id),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }),

  // Shipping Address Fields
  shippingFirstName: varchar('shipping_first_name', { length: 100 }).notNull(),
  shippingLastName: varchar('shipping_last_name', { length: 100 }).notNull(),
  shippingAddressLine1: varchar('shipping_address_line1', { length: 255 }).notNull(),
  shippingCity: varchar('shipping_city', { length: 100 }).notNull(),
  shippingState: varchar('shipping_state', { length: 100 }).notNull(),
  shippingPostalCode: varchar('shipping_postal_code', { length: 20 }).notNull(),

  // Billing Address Fields
  billingFirstName: varchar('billing_first_name', { length: 100 }).notNull(),
  billingLastName: varchar('billing_last_name', { length: 100 }).notNull(),
  billingAddressLine1: varchar('billing_address_line1', { length: 255 }).notNull(),
  billingCity: varchar('billing_city', { length: 100 }).notNull(),
  billingState: varchar('billing_state', { length: 100 }).notNull(),
  billingPostalCode: varchar('billing_postal_code', { length: 20 }).notNull(),

  paymentStatus: text('payment_status').default(PAYMENT_STATUS.PENDING),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
