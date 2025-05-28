import { api } from '@/lib/api-client';
import { sortOptions, SortOptions } from '@/lib/constants';
import { type Product } from '@repo/types/product';

type ProductsParams = {
  sort: SortOptions;
  limit: number;
  page: number;
};

type GetProductsProps = {
  queryParams: ProductsParams;
};

export async function getProducts({ queryParams }: GetProductsProps) {
  const sort = sortOptions.find((option) => option === queryParams.sort) || 'latest_desc';
  const response = await api.get<{
    products: Product[];
    count: number;
  }>('/products', {
    params: { ...queryParams, sort },
  });

  return response.data;
}
