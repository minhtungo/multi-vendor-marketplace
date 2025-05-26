import { Home, Percent, Settings, ShoppingBag, Tag, User, Users } from 'lucide-react';

export const menu = {
  main: [
    {
      title: 'Home',
      href: '/',
      icon: Home,
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: ShoppingBag,
    },
    {
      title: 'Products',
      href: '/products',
      icon: Tag,
    },
    {
      title: 'Product Categories',
      href: '/product-categories',
      icon: Tag,
    },
    {
      title: 'Customers',
      href: '/customers',
      icon: Users,
    },
    {
      title: 'Discounts',
      href: '/discounts',
      icon: Percent,
    },
  ],
  settings: [
    {
      title: 'Profile',
      href: '/settings/profile',
      icon: User,
    },
  ],
  userMenu: [
    {
      title: 'Profile',
      href: '/profile',
      icon: User,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ],
};
