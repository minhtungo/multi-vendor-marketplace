import { getProducts } from '@/server/product/get-products';
import { ProductCard } from '@/modules/products/components/product-card';
import { SortOptionSlug } from '@/lib/constants/shop';
import { cn } from '@repo/ui/lib/utils';
import { SortingSelection } from '@/modules/shop/components/sorting-selection';

type PaginatedProductsProps = {
  sort: SortOptionSlug;
  page: number;
  className?: string;
};

export async function PaginatedProducts({ sort, page, className }: PaginatedProductsProps) {
  const data = await getProducts({ queryParams: { limit: 20, sort, page } });

  if (data.products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className={cn(className)}>
      <div className='flex items-center justify-end'>
        <SortingSelection sort={sort} />
      </div>
      <ul className='grid grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8'>
        {data.products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
