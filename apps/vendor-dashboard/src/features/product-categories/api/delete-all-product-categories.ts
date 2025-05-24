import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { getProductCategoriesQueryOptions } from '@/features/product-categories/api/get-product-categories';
import type { ApiResponse } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function deleteAllProductCategories(): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.productCategory.root}/all`);
}

export function useDeleteAllProductCategoriesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllProductCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductCategoriesQueryOptions().queryKey });
    },
  });
}
