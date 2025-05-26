import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ProductCategory } from '@repo/types/product-category';
import { queryOptions, useQuery } from '@tanstack/react-query';

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await privateApi.get(server.path.productCategory.root);
  return response.data;
}

export function getProductCategoriesQueryOptions() {
  return queryOptions({
    queryKey: ['product-categories'],
    queryFn: getProductCategories,
  });
}

export function useGetProductCategoriesQuery() {
  return useQuery({
    ...getProductCategoriesQueryOptions(),
  });
}
