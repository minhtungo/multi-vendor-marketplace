import { categories } from '@/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const insertCategorySchema = createInsertSchema(categories);
export const categorySchema = createSelectSchema(categories);
export const updateCategorySchema = insertCategorySchema.partial();

export type Category = z.infer<typeof categorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type CreateCategory = z.infer<typeof insertCategorySchema>;
