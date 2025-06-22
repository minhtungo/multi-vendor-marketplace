import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

export const deleteProductSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductInput = z.infer<typeof deleteProductSchema>;

export async function deleteProduct({ id }: DeleteProductInput): Promise<ApiResponse<null>> {
  return privateApi.delete(api.products.single(id));
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: deleteProduct,
  });
}
