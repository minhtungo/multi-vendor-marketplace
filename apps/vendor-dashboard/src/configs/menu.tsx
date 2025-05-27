import { Home, Percent, ShoppingBag, Tag, User, Users } from '@repo/ui/icons';

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
      href: '/settings/profile',
      icon: User,
    },
  ],
};
