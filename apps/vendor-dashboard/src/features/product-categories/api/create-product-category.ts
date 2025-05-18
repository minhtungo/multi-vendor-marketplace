import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { ProductCategory } from '@/types/product-category';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createProductCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export type CreateProductCategoryInput = z.infer<typeof createProductCategorySchema>;

export async function createProductCategory(data: CreateProductCategoryInput): Promise<ApiResponse<ProductCategory>> {
  const createProductCategoryData = createProductCategorySchema.parse(data);
  return privateApi.post(server.path.productCategory.root, createProductCategoryData);
}

export function useCreateProductCategoryMutation() {
  return useMutation({
    mutationFn: createProductCategory,
  });
}
