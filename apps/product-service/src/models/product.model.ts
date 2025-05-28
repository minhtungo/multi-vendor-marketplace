import { productCategorySchema, productSchema } from '@/db/schemas';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const productResponseSchema = productSchema.extend({
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      handle: z.string(),
    })
  ),
});

export const createProductRequestSchema = productSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categories: z.array(z.string()),
  });

export const updateProductRequestSchema = createProductRequestSchema.partial();

export const productListResponseSchema = z.object({
  products: z.array(productSchema),
  count: z.number(),
});

export const getProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(['price_asc', 'price_desc', 'latest_desc', 'latest_asc']).optional(),
});

export const getProductQuerySchema = z
  .object({
    id: z.string().uuid('Invalid product ID').optional(),
    handle: z.string().optional(),
  })
  .refine((data) => data.id || data.handle, {
    message: "Either 'id' or 'handle' must be provided",
  });

// Type exports
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type CreateProduct = z.infer<typeof createProductRequestSchema>;
export type UpdateProduct = z.infer<typeof updateProductRequestSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type GetProductQuery = z.infer<typeof getProductQuerySchema>;
