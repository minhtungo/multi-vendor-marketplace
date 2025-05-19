import { pgTable, serial, varchar, timestamp, decimal, text, jsonb, uuid } from 'drizzle-orm/pg-core';
import { discountCodes } from './discount-codes';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  customerId: uuid('customer_id').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  discountCodeId: serial('discount_code_id').references(() => discountCodes.id),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }),

  // Shipping Address Fields
  shippingFirstName: varchar('shipping_first_name', { length: 100 }).notNull(),
  shippingLastName: varchar('shipping_last_name', { length: 100 }).notNull(),
  shippingAddressLine1: varchar('shipping_address_line1', { length: 255 }).notNull(),
  shippingAddressLine2: varchar('shipping_address_line2', { length: 255 }),
  shippingCity: varchar('shipping_city', { length: 100 }).notNull(),
  shippingState: varchar('shipping_state', { length: 100 }).notNull(),
  shippingPostalCode: varchar('shipping_postal_code', { length: 20 }).notNull(),
  shippingCountry: varchar('shipping_country', { length: 100 }).notNull(),
  shippingPhone: varchar('shipping_phone', { length: 20 }),

  // Billing Address Fields
  billingFirstName: varchar('billing_first_name', { length: 100 }).notNull(),
  billingLastName: varchar('billing_last_name', { length: 100 }).notNull(),
  billingAddressLine1: varchar('billing_address_line1', { length: 255 }).notNull(),
  billingAddressLine2: varchar('billing_address_line2', { length: 255 }),
  billingCity: varchar('billing_city', { length: 100 }).notNull(),
  billingState: varchar('billing_state', { length: 100 }).notNull(),
  billingPostalCode: varchar('billing_postal_code', { length: 20 }).notNull(),
  billingCountry: varchar('billing_country', { length: 100 }).notNull(),
  billingPhone: varchar('billing_phone', { length: 20 }),

  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 20 }).notNull().default('pending'),
  notes: text('notes'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  vendorId: uuid('vendor_id').notNull(),
});
