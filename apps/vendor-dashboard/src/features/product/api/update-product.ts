import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/product';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const updateProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  sku: z.string().min(1).optional(),
  compareAtPrice: z.number().optional(),
  quantity: z.number().optional(),
  images: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export async function updateProduct(data: UpdateProductInput): Promise<ApiResponse<Product>> {
  const { id, ...updateData } = updateProductSchema.parse(data);
  return privateApi.put(`${server.path.product.root}/${id}`, updateData);
}

export function useUpdateProductMutation() {
  return useMutation({
    mutationFn: updateProduct,
  });
}
