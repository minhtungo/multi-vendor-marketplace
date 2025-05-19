import { vendorStatusSchema } from '@/db/schemas/constants';
import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  vendorId: uuid('vendor_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal('compare_at_price', { precision: 10, scale: 2 }),
  quantity: integer('quantity').notNull().default(0),
  status: vendorStatusSchema('status').notNull().default('pending'),
  isActive: boolean('is_active').notNull().default(true),
  metadata: jsonb('metadata'),
  images: jsonb('images').$type<string[]>(),
  categories: jsonb('categories').$type<string[]>(),
  tags: jsonb('tags').$type<string[]>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
