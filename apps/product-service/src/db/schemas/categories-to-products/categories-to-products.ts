import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { products } from '../products/products';
import { categories } from '@/db/schemas/categories/categories';

export const categoriesToProducts = pgTable(
  'categories_to_products',
  {
    productId: text('product_id')
      .references(() => products.id, { onDelete: 'cascade' })
      .notNull(),
    categoryId: text('category_id')
      .references(() => categories.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.categoryId] }),
  })
);

export const categoriesToProductsRelations = relations(categoriesToProducts, ({ one }) => ({
  product: one(products, {
    fields: [categoriesToProducts.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [categoriesToProducts.categoryId],
    references: [categories.id],
  }),
}));
