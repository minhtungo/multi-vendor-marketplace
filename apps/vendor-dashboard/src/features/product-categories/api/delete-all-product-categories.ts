import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import { getProductCategoriesQueryOptions } from '@/features/product-categories/api/get-product-categories';
import type { ApiResponse } from '@repo/types/api';
import { useMutation } from '@tanstack/react-query';

export async function deleteAllProductCategories(): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.productCategory.root}/all`);
}

export function useDeleteAllProductCategoriesMutation() {
  return useMutation({
    mutationFn: deleteAllProductCategories,
    meta: {
      successMessage: 'All product categories deleted successfully',
      errorMessage: 'Failed to delete all product categories',
      invalidatesQuery: getProductCategoriesQueryOptions().queryKey,
    },
  });
}
