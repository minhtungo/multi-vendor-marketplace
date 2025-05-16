import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Shop } from '@/types/shop';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export async function createProduct(data: CreateProductInput): Promise<
  ApiResponse<{
    shop: Shop;
  }>
> {
  const createProductData = createProductSchema.parse(data);
  return privateApi.post(server.path.product.createProduct, createProductData);
}

export function useCreateProductMutation() {
  return useMutation({
    mutationFn: createProduct,
  });
}
