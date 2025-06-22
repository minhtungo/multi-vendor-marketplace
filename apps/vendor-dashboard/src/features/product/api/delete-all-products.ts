import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';
import { useMutation } from '@tanstack/react-query';

export async function deleteAllProducts(): Promise<ApiResponse<null>> {
  return privateApi.delete(`${api.products.all}/all`);
}

export function useDeleteAllProductsMutation() {
  return useMutation({
    mutationFn: deleteAllProducts,
  });
}
