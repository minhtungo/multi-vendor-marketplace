import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export async function deleteAllProductCategories(): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.productCategory.root}/all`);
}

export function useDeleteAllProductCategoriesMutation() {
  return useMutation({
    mutationFn: deleteAllProductCategories,
  });
}
