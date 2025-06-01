import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  parentId: z.string().optional(),
  handle: z.string().min(1, 'Handle is required'),
  status: z.enum(['active', 'inactive']),
});
export type CreateCategory = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export const categoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  parentId: z.string(),
  handle: z.string(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
