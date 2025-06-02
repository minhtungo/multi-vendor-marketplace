import { SkeletonProductGrid } from '@/modules/skeletons/templates/skeleton-product-grid';
import { SortOptions } from '@/lib/constants';
import { PaginatedProducts } from '@/modules/products/components/paginated-products';
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
