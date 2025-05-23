import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const getProductsSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(20),
});

export type GetProductsInput = z.infer<typeof getProductsSchema>;

export type GetProductsResponse = {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getProducts(params: GetProductsInput): Promise<GetProductsResponse> {
  const response = await privateApi.get(server.path.product.root, { params });
  return response.data;
}

export function useGetProducts(params: GetProductsInput) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
}
