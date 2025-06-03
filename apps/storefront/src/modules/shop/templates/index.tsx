import { SortOptionSlug } from '@/lib/constants/shop';
import { PaginatedProducts } from '@/modules/products/components/paginated-products';
import { FilterList } from '@/modules/shop/components/filter-list';
import { SortingSelection } from '@/modules/shop/components/sorting-selection';

type ShopTemplateProps = {
  sort: SortOptionSlug;
  page: number;
};

export function ShopTemplate({ sort, page }: ShopTemplateProps) {
  return (
    <div className='flex flex-col sm:flex-row gap-12'>
      <FilterList className='w-64 hidden sm:block' />
      <PaginatedProducts sort={sort} page={page} className='flex-1 space-y-6' />
    </div>
  );
}
