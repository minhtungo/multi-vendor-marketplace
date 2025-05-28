import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { categories } from './categories';

export const insertProductCategorySchema = createInsertSchema(categories);
export const productCategorySchema = createSelectSchema(categories);

export type InsertProductCategory = typeof categories.$inferInsert;
export type ProductCategory = typeof categories.$inferSelect;
