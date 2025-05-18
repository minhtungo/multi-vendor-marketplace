import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const deleteProductCategorySchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductCategoryInput = z.infer<typeof deleteProductCategorySchema>;

export async function deleteProductCategory({ id }: DeleteProductCategoryInput): Promise<ApiResponse<null>> {
  return privateApi.delete(`${server.path.productCategory.root}/${id}`);
}

export function useDeleteProductCategoryMutation() {
  return useMutation({
    mutationFn: deleteProductCategory,
  });
}
