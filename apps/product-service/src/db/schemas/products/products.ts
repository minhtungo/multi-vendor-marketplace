import { categoriesToProducts } from '@/db/schemas/categories-to-products';
import { productTypeSchema, statusSchema } from '@/db/schemas/constants';
import { relations } from 'drizzle-orm';
import { index } from 'drizzle-orm/pg-core';
import { decimal, integer, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const products = pgTable(
  'products',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    vendorId: uuid('vendor_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    handle: varchar({ length: 255 }).notNull().unique(),
    description: text('description'),
    sku: varchar('sku', { length: 100 }).notNull().unique(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: decimal('compare_at_price', { precision: 10, scale: 2 }),
    stock: integer('stock').notNull(),
    status: statusSchema().default('draft'),
    type: productTypeSchema('type').default('physical'),
    images: jsonb('images').$type<string[]>(),
    tags: jsonb('tags').$type<string[]>(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    nameIndex: index('name_index').on(t.name),
    handleIndex: index('handle_index').on(t.handle),
  })
);

export const productsRelations = relations(products, ({ many }) => ({
  categories: many(categoriesToProducts),
}));
