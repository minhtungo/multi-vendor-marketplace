export const HERO_SLIDER_ITEMS = [
  {
    id: 1,
    title: 'Weekend Sale',
    subtitle: 'Save up to 50% on over 50 exciting products.',
    description: 'Sale ends May 31.*',
    bgColor: 'bg-blue-900',
    textColor: 'text-white',
    image: '/placeholder.svg?height=400&width=400',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Check out the latest tech gadgets.',
    description: 'Free shipping on orders over $50',
    bgColor: 'bg-purple-900',
    textColor: 'text-white',
    image: '/placeholder.svg?height=400&width=400',
    buttonText: 'Explore',
    buttonLink: '/shop',
  },
  {
    id: 3,
    title: 'Summer Essentials',
    subtitle: 'Get ready for summer with our top picks.',
    description: 'Limited time offers',
    bgColor: 'bg-indigo-900',
    textColor: 'text-white',
    image: '/placeholder.svg?height=400&width=400',
    buttonText: 'View Collection',
    buttonLink: '/summer',
  },
];

export const HERO_RIGHT_BANNERS = [
  {
    id: 1,
    title: 'Special Offer',
    subtitle: 'Get your order in as little as 1 hour with in-store pickup.',
    bgColor: 'bg-purple-700',
    textColor: 'text-white',
    image: '/placeholder.svg?height=300&width=300',
    buttonText: 'Shop Now',
    buttonLink: '/special-offer',
  },
  {
    id: 2,
    title: 'Top Deals',
    subtitle: 'Find the hottest offers of the week, all in one place.',
    bgColor: 'bg-blue-700',
    textColor: 'text-white',
    image: '/placeholder.svg?height=300&width=300',
    buttonText: 'Shop Now',
    buttonLink: '/top-deals',
  },
];

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
