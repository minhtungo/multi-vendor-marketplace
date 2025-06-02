import { Headphones, RotateCcw, Shield, Truck } from '@repo/ui/icons';

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    subtitle: 'Discover the latest trends',
    description: 'Up to 50% off on selected items',
    image: '/placeholder.svg',
    cta: 'Shop Now',
    link: '/shop',
    linkText: 'Shop Now',
  },
  {
    id: 2,
    title: 'Premium Electronics',
    subtitle: 'Tech that transforms',
    description: 'Free shipping on orders over $100',
    image: '/placeholder.svg',
    cta: 'Explore',
    link: '/shop',
    linkText: 'Explore',
  },
  {
    id: 3,
    title: 'Home & Living',
    subtitle: 'Create your perfect space',
    description: 'New arrivals every week',
    image: '/placeholder.svg',
    cta: 'Discover',
    link: '/shop',
    linkText: 'Discover',
  },
];

export const FEATURES = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];
