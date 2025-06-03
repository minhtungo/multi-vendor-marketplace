import { api } from '@/lib/api-client';
import { sortOptionSlugs, SortOptionSlug } from '@/lib/constants/shop';
import { type Product } from '@repo/types/product';

type ProductsParams = {
  sort: SortOptionSlug;
  limit: number;
  page: number;
};

type GetProductsProps = {
  queryParams: ProductsParams;
};

export async function getProducts({ queryParams }: GetProductsProps) {
  const sort = sortOptionSlugs.find((option) => option === queryParams.sort) || 'latest_desc';
  console.log(queryParams);
  const response = await api.get<{
    products: Product[];
    count: number;
  }>('/products', {
    params: {
      sort,
      limit: queryParams.limit,
      page: queryParams.page,
    },
  });

  return response.data;
}
