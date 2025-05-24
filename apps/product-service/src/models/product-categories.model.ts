import { z } from 'zod';

export const CreateProductCategoryRequestSchema = z.object({
  name: z.string().min(1, 'Product category name is required').max(255, 'Product category name too long'),
  slug: z.string().min(1, 'Product category slug is required').max(255, 'Product category slug too long'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('inactive'),
});
