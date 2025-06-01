import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
  description: z.string().optional(),
  sku: z.string(),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  categories: z.array(z.string()),
  vendorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  stock: z.number(),
  status: z.enum(['draft', 'published', 'archived']),
  type: z.enum(['physical', 'digital']),
  images: z.array(z.string()),
  tags: z.array(z.string()),
});

export const createProductRequestSchema = productResponseSchema.omit({
  id: true,
  vendorId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductRequestSchema = productResponseSchema.partial().omit({
  id: true,
  vendorId: true,
  createdAt: true,
  updatedAt: true,
});

export const productListResponseSchema = z.object({
  products: z.array(productResponseSchema),
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
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type GetProductQuery = z.infer<typeof getProductQuerySchema>;
export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;
export type UpdateProductRequest = z.infer<typeof updateProductRequestSchema>;
