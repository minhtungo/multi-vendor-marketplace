import { productSchema } from '@/db/schemas';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const CreateProductRequestSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255, 'Product name too long'),
  slug: z.string().min(1, 'Product slug is required').max(255, 'Product slug too long'),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required').max(100, 'SKU too long'),
  price: z.coerce.number().positive('Price must be positive'),
  compareAtPrice: z.coerce.number().positive('Compare at price must be positive').optional(),
  quantity: z.coerce.number().int().min(0, 'Quantity must be non-negative'),
  status: z.enum(['published', 'draft']).default('draft'),
  type: z.enum(['physical', 'digital']).default('physical'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const UpdateProductRequestSchema = CreateProductRequestSchema.partial();

export const ProductListResponseSchema = z.object({
  products: z.array(productSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export const GetProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(['price_asc', 'price_desc', 'latest_desc', 'latest_asc']).optional(),
});

// Type exports
export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;
export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>;
