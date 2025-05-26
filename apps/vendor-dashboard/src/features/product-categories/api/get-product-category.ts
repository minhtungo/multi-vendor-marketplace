import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';
import type { ProductCategory } from '@repo/types/product-category';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const getProductCategorySchema = z.object({
  id: z.string().uuid(),
});

export type GetProductCategoryInput = z.infer<typeof getProductCategorySchema>;

export async function getProductCategory({ id }: GetProductCategoryInput): Promise<ApiResponse<ProductCategory>> {
  return privateApi.get(`${server.path.productCategory.root}/${id}`);
}

export function getProductCategoryQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['product-category', id],
    queryFn: () => getProductCategory({ id }),
    enabled: !!id,
  });
}

export function useGetProductCategoryQuery(id: string) {
  return useQuery({
    ...getProductCategoryQueryOptions(id),
  });
}
