import { SortOptions } from '@/lib/constants';
import { PaginatedProducts } from '@/modules/products/components/paginated-products';
import { FilterSidebar } from '@/modules/shop/components/filter-sidebar';
import { SortingSelection } from '@/modules/shop/components/sorting-selection';

type ShopTemplateProps = {
  sort: SortOptions;
  page: number;
};

export function ShopTemplate({ sort, page }: ShopTemplateProps) {
  return (
    <div className='flex flex-col sm:flex-row  gap-8'>
      <FilterSidebar className='w-64 hidden sm:block' />
      <div className='flex-1 space-y-6'>
        <div className='flex items-center justify-end'>
          <SortingSelection sort={sort} />
        </div>
        <PaginatedProducts sort={sort} page={page} />
      </div>
    </div>
  );
}
