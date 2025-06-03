import { SortOptionSlug } from '@/lib/constants/shop';
import { ShopTemplate } from '@/modules/shop/templates';
import { SkeletonProductGrid } from '@/modules/skeletons/templates/skeleton-product-grid';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Explore all of our products.',
};

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptionSlug;
    page?: string;
  }>;
};

export default async function ShopPage({ searchParams }: Params) {
  const { sortBy, page } = await searchParams;
  const sort = sortBy || 'latest_desc';
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <Suspense fallback={<SkeletonProductGrid />}>
      <ShopTemplate sort={sort} page={pageNumber} />
    </Suspense>
  );
}
