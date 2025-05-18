import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const deleteProductSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductInput = z.infer<typeof deleteProductSchema>;

export async function deleteProduct({ id }: DeleteProductInput): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.product.root}/${id}`);
}

export function useDeleteProductMutation() {
  return useMutation({
    mutationFn: deleteProduct,
  });
}
