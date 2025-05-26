import { ShopLayout } from '@/features/shop/components/shop-layout';
import { SortOptions } from '@/types/product';
import { Metadata } from 'next';

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

  return <ShopLayout sortBy={sortBy} page={page} />;
}
