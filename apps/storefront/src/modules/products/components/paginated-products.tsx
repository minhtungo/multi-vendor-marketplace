import { getProducts } from '@/features/products/api/get-products';
import { ProductCard } from '@/features/products/components/product-card';
import { SortOptions } from '@/lib/constants';

type PaginatedProductsProps = {
  sort: SortOptions;
  page: number;
};

export async function PaginatedProducts({ sort, page }: PaginatedProductsProps) {
  const data = await getProducts({ queryParams: { limit: 20, sort, page } });

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
