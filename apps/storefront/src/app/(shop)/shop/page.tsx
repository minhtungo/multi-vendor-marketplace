import { SkeletonProductGrid } from '@/components/skeletons/skeleton-propduct-grid';
import { PaginatedProducts } from '@/features/products/components/paginated-products';
import { SortOptions } from '@/lib/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Explore all of our products.',
};

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
};

export default async function ShopPage(props: Params) {
  const searchParams = props.searchParams;
  const { sortBy, page } = await searchParams;
  const sort = sortBy || 'latest_desc';
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <Suspense fallback={<SkeletonProductGrid />}>
      <PaginatedProducts sort={sort} page={pageNumber} />
    </Suspense>
  );
}
