import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { getProductCategoriesQueryOptions } from '@/features/product-categories/api/get-product-categories';
import { getProductCategoryQueryOptions } from '@/features/product-categories/api/get-product-category';
import type { ApiResponse } from '@repo/types/api';
import type { ProductCategory } from '@repo/types/product-category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const editProductCategorySchema = z.object({
  name: z.string().min(1, 'Product category name is required').max(255, 'Product category name too long').optional(),
  slug: z.string().min(1, 'Product category slug is required').max(255, 'Product category slug too long').optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type EditProductCategoryInput = z.infer<typeof editProductCategorySchema>;

export async function editProductCategory(
  id: string,
  data: EditProductCategoryInput,
): Promise<ApiResponse<ProductCategory>> {
  const parsedData = editProductCategorySchema.parse(data);
  return privateApi.put(`${server.path.productCategory.root}/${id}`, parsedData);
}

export function useEditProductCategory(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditProductCategoryInput }) => editProductCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductCategoriesQueryOptions().queryKey });
      queryClient.invalidateQueries({
        queryKey: getProductCategoryQueryOptions(id).queryKey,
      });
    },
  });
}
