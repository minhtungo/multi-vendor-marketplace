import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { Product } from '@repo/types/product';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

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
  const response = await privateApi.get(api.products.all, { params });
  return response.data;
}

export function getProductsQueryOptions(params: GetProductsInput) {
  return {
    queryKey: ['products', params.page],
    queryFn: () => getProducts(params),
  };
}
export function useGetProducts(params: GetProductsInput) {
  return useQuery({
    ...getProductsQueryOptions(params),
  });
}
