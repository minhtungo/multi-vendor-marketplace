import { SkeletonProductGrid } from '@/components/skeletons/skeleton-propduct-grid';
import { PaginatedProducts } from '@/features/product/components/paginated-products';
import { SortOptions } from '@/types/product';
import { Suspense } from 'react';

type ShopLayoutProps = {
  sortBy?: SortOptions;
  page?: string;
};

export function ShopLayout({ sortBy, page }: ShopLayoutProps) {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  return (
    <div>
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts sortBy={sort} page={pageNumber} />
      </Suspense>
    </div>
  );
}
