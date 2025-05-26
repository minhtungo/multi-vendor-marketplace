import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { getProductCategoriesQueryOptions } from '@/features/product-categories/api/get-product-categories';
import type { ApiResponse } from '@repo/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const deleteProductCategorySchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductCategoryInput = z.infer<typeof deleteProductCategorySchema>;

export async function deleteProductCategory({ id }: DeleteProductCategoryInput): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.productCategory.root}/${id}`);
}

export function useDeleteProductCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductCategoriesQueryOptions().queryKey });
    },
  });
}
