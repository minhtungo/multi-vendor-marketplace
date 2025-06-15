import { categories } from '@/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const insertCategorySchema = createInsertSchema(categories);
export const categorySchema = createSelectSchema(categories);
export const updateCategorySchema = insertCategorySchema.partial();

// Request validation schemas
export const GetProductCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const CreateProductCategorySchema = z.object({
  body: insertCategorySchema,
});

export const UpdateProductCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: updateCategorySchema,
});

export const DeleteProductCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type Category = z.infer<typeof categorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type CreateCategory = z.infer<typeof insertCategorySchema>;
export type GetProductCategoryInput = z.infer<typeof GetProductCategorySchema>;
export type CreateProductCategoryInput = z.infer<typeof CreateProductCategorySchema>;
export type UpdateProductCategoryInput = z.infer<typeof UpdateProductCategorySchema>;
export type DeleteProductCategoryInput = z.infer<typeof DeleteProductCategorySchema>;
