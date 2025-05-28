import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { getProductCategoriesQueryOptions } from '@/features/product-categories/api/get-product-categories';
import { queryClient } from '@/integrations/tanstack-query/query-client';
import type { ApiResponse } from '@repo/types/api';
import type { ProductCategory } from '@repo/types/product-category';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createProductCategorySchema = z.object({
  name: z.string().min(1, 'Product category name is required').max(255, 'Product category name too long'),
  handle: z.string().min(1, 'Product category handle is required').max(255, 'Product category handle too long'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

export type CreateProductCategoryInput = z.infer<typeof createProductCategorySchema>;

export async function createProductCategory(data: CreateProductCategoryInput): Promise<ApiResponse<ProductCategory>> {
  const createProductCategoryData = createProductCategorySchema.parse(data);
  return privateApi.post(server.path.productCategory.root, createProductCategoryData);
}

export function useCreateProductCategory() {
  return useMutation({
    mutationFn: createProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductCategoriesQueryOptions().queryKey });
    },
  });
}
