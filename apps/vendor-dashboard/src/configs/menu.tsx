import { Home, Package, Settings, ShoppingBag, Users } from 'lucide-react';

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
        title: 'Dashboard',
        href: '/dashboard',
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
        icon: Package,
      },
      {
        title: 'Customers',
        href: '/customers',
        icon: Users,
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
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
