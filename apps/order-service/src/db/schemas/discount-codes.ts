import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const discountCodes = pgTable('discount_codes', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  code: varchar('code', { length: 50 }).notNull().unique(),
  vendorId: text('vendor_id').notNull(),
  type: varchar('type', { length: 20 }).notNull(), // 'percentage' or 'fixed'
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  minOrderAmount: decimal('min_order_amount', { precision: 10, scale: 2 }),
  maxUses: integer('max_uses'),
  currentUses: integer('current_uses').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  description: text('description'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
