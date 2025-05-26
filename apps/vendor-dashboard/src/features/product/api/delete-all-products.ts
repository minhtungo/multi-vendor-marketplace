import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';
import { useMutation } from '@tanstack/react-query';

export async function deleteAllProducts(): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.product.root}/all`);
}

export function useDeleteAllProductsMutation() {
  return useMutation({
    mutationFn: deleteAllProducts,
  });
}
