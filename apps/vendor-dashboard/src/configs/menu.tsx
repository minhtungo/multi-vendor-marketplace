import { Home, Package, PackagePlus, Percent, Settings, ShoppingBag, Tag, Users } from 'lucide-react';

export const menu = {
  main: [
    {
      title: 'Shop',
      href: '/shop',
    },
    {
      title: 'Offers',
      href: '/offers',
    },
    {
      title: 'Become a seller',
      href: '/become-a-seller',
    },
  ],
  dashboard: {
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
  },
  footer: [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Features',
      href: '/features',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
  ],
};
