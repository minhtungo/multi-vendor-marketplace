export const sortingOptions = [
  { title: 'Newest', slug: 'latest_desc' },
  { title: 'Oldest', slug: 'latest_asc' },
  { title: 'Price: Low to high', slug: 'price_asc' },
  { title: 'Price: High to low', slug: 'price_desc' },
] as const;

export const defaultSort = sortingOptions[0];

export type SortOptionSlug = (typeof sortingOptions)[number]['slug'];

export const sortOptionSlugs = sortingOptions.map((option) => option.slug);
