import { categoriesToProducts } from '@/db/schemas/categories-to-products';
import { productCategoryStatusSchema } from '@/db/schemas/constants';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  handle: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  parentId: text('parent_id').references((): any => categories.id),
  status: productCategoryStatusSchema().default('active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(categoriesToProducts),
}));
