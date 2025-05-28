import { productSchema } from '@/db/schemas';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const createProductRequestSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255, 'Product name too long'),
  handle: z.string().min(1, 'Product handle is required').max(255, 'Product handle too long'),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required').max(100, 'SKU too long'),
  price: z.coerce.number().positive('Price must be positive'),
  compareAtPrice: z.coerce.number().positive('Compare at price must be positive').optional(),
  stock: z.coerce.number().int().min(0, 'Stock must be non-negative'),
  status: z.enum(['published', 'draft']).default('draft'),
  type: z.enum(['physical', 'digital']).default('physical'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateProductRequestSchema = createProductRequestSchema.partial();

export const productListResponseSchema = z.object({
  products: z.array(productSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
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
export type CreateProduct = z.infer<typeof createProductRequestSchema>;
export type UpdateProduct = z.infer<typeof updateProductRequestSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type GetProductQuery = z.infer<typeof getProductQuerySchema>;
