import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/product';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number(),
  sku: z.string().min(1),
  compareAtPrice: z.number().optional(),
  quantity: z.number(),
  images: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export async function createProduct(data: CreateProductInput): Promise<ApiResponse<Product>> {
  const createProductData = createProductSchema.parse(data);
  return privateApi.post(server.path.product.create, createProductData);
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}
