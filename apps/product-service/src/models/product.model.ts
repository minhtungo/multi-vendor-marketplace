import { products } from '@/db/schemas';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const productSchema = createSelectSchema(products);

export const createProductRequestSchema = createInsertSchema(products)
  .omit({
    id: true,
    vendorId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categories: z.array(z.string()).optional(),
  });

export const updateProductRequestSchema = createUpdateSchema(products)
  .omit({
    id: true,
    vendorId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categories: z.array(z.string()).optional(),
  });

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
    id: z.uuid('Invalid product ID').optional(),
    handle: z.string().optional(),
  })
  .refine((data) => data.id || data.handle, {
    message: "Either 'id' or 'handle' must be provided",
  });

// Type exports
export type Product = z.infer<typeof productSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type GetProductQuery = z.infer<typeof getProductQuerySchema>;
export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;
export type UpdateProductRequest = z.infer<typeof updateProductRequestSchema>;
