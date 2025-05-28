import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { categoriesToProducts } from './categories-to-products';

export const insertCategoryToProductSchema = createInsertSchema(categoriesToProducts);
export const categoryToProductSchema = createSelectSchema(categoriesToProducts);

export type InsertCategoryToProduct = typeof categoriesToProducts.$inferInsert;
export type CategoryToProduct = typeof categoriesToProducts.$inferSelect;
