import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { categories } from './categories';

export const insertCategorySchema = createInsertSchema(categories);
export const categorySchema = createSelectSchema(categories);

export type InsertCategory = typeof categories.$inferInsert;
export type Category = typeof categories.$inferSelect;
