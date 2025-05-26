import { listProducts } from '@/features/product/api/list-products';
import { ProductCard } from '@/features/product/components/product-card';
import { SortOptions } from '@/types/product';

type PaginatedProductsProps = {
  sortBy: SortOptions;
  page: number;
};

export async function PaginatedProducts({ sortBy, page }: PaginatedProductsProps) {
  const data = await listProducts({ queryParams: { limit: 12 }, pageParam: page });
  return (
    <ul className='grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8'>
      {data.products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
