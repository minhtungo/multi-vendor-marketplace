import { getProducts } from '@/server/product/get-products';
import { ProductCard } from '@/modules/products/components/product-card';
import { SortOptions } from '@/lib/constants';
import { cn } from '@repo/ui/lib/utils';

type PaginatedProductsProps = {
  sort: SortOptions;
  page: number;
  className?: string;
};

export async function PaginatedProducts({ sort, page, className }: PaginatedProductsProps) {
  const data = await getProducts({ queryParams: { limit: 20, sort, page } });

  if (data.products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <ul className={cn('grid grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8', className)}>
      {data.products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
