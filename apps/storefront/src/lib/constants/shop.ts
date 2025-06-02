export const sortOptions = ['price_asc', 'price_desc', 'latest_asc', 'latest_desc'] as const;

export type SortFilterItem = {
  title: string;
  slug: string;
};

export const defaultSort: SortFilterItem = {
  title: 'Newest',
  slug: 'latest_desc',
};

export const sortingOptions: SortFilterItem[] = [
  defaultSort,
  { title: 'Oldest', slug: 'latest_asc' },
  { title: 'Price: Low to high', slug: 'price_asc' },
  { title: 'Price: High to low', slug: 'price_desc' },
];

export type SortOptions = (typeof sortingOptions)[number]['slug'];
