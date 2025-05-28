import { productCategoryStatusSchema } from '@/db/schemas/constants';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { products } from '../products/products';
import { primaryKey } from 'drizzle-orm/pg-core';

export const productCategories = pgTable('product_categories', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  parentId: text('parent_id').references((): any => productCategories.id),
  status: productCategoryStatusSchema().default('active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productCategoriesToProducts = pgTable(
  'product_categories_to_products',
  {
    productId: text('product_id')
      .references(() => products.id, { onDelete: 'cascade' })
      .notNull(),
    categoryId: text('category_id')
      .references(() => productCategories.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.categoryId] }),
  })
);

export const productCategoriesRelations = relations(productCategories, ({ one, many }) => ({
  // Self-referencing relations with explicit names
  parent: one(productCategories, {
    fields: [productCategories.parentId],
    references: [productCategories.id],
    relationName: 'CategoryHierarchy', // Add this
  }),
  children: many(productCategories, {
    relationName: 'CategoryHierarchy', // Add this
  }),
  // Junction table relation
  productCategoriesToProducts: many(productCategoriesToProducts),
}));

export const productCategoriesToProductsRelations = relations(productCategoriesToProducts, ({ one }) => ({
  product: one(products, {
    fields: [productCategoriesToProducts.productId],
    references: [products.id],
  }),
  category: one(productCategories, {
    fields: [productCategoriesToProducts.categoryId],
    references: [productCategories.id],
  }),
}));
