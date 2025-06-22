import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import { getProductCategoriesQueryOptions } from '@/features/product-categories/api/get-product-categories';
import type { ApiResponse } from '@repo/types/api';
import type { ProductCategory } from '@repo/types/product-category';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const createProductCategorySchema = z.object({
  name: z.string().min(1, 'Product category name is required').max(255, 'Product category name too long'),
  handle: z.string().min(1, 'Product category handle is required').max(255, 'Product category handle too long'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

export type CreateProductCategoryInput = z.infer<typeof createProductCategorySchema>;

export async function createProductCategory(data: CreateProductCategoryInput): Promise<ApiResponse<ProductCategory>> {
  const createProductCategoryData = createProductCategorySchema.parse(data);
  return privateApi.post(api.productCategories.all, createProductCategoryData);
}

export function useCreateProductCategory() {
  return useMutation({
    mutationFn: createProductCategory,
    meta: {
      successMessage: 'Product category created successfully',
      errorMessage: 'Failed to create product category',
      invalidatesQuery: getProductCategoriesQueryOptions().queryKey,
    },
  });
}
