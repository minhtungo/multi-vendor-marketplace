import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import { getProductsQueryOptions } from '@/features/product/api/get-products';
import type { ApiResponse } from '@repo/types/api';
import type { Product } from '@repo/types/product';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const createProductSchema = z.object({
  name: z.string().min(1),
  handle: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().min(1),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  stock: z.number(),
  status: z.enum(['draft', 'published']),
  type: z.enum(['physical', 'digital']),
  images: z.array(z.string()),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export async function createProduct(data: CreateProductInput): Promise<ApiResponse<Product>> {
  const createProductData = createProductSchema.parse(data);
  return privateApi.post(api.products.all, createProductData);
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
    meta: {
      successMessage: 'Product created successfully',
      errorMessage: 'Failed to create product',
      invalidatesQuery: getProductsQueryOptions({ page: 1, limit: 20 }).queryKey,
    },
  });
}
