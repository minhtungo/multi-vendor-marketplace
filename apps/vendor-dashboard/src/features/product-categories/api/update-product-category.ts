import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { ProductCategory } from '@/types/product-category';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const updateProductCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export type UpdateProductCategoryInput = z.infer<typeof updateProductCategorySchema>;

export async function updateProductCategory(data: UpdateProductCategoryInput): Promise<ApiResponse<ProductCategory>> {
  const { id, ...updateData } = updateProductCategorySchema.parse(data);
  return privateApi.put(`${server.path.productCategory.root}/${id}`, updateData);
}

export function useUpdateProductCategoryMutation() {
  return useMutation({
    mutationFn: updateProductCategory,
  });
}
