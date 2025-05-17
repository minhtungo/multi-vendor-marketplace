import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { productCategories } from './product-categories';

export const insertProductCategorySchema = createInsertSchema(productCategories);
export const productCategorySchema = createSelectSchema(productCategories);

export type InsertProductCategory = typeof productCategories.$inferInsert;
export type ProductCategory = typeof productCategories.$inferSelect;
