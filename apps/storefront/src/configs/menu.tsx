import { clientPaths } from '@/configs/paths';
import { CreditCard, Heart, MapPin, Settings, ShoppingBag, User } from '@repo/ui/icons';

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
  account: [
    {
      title: 'Profile',
      href: clientPaths.account.profile,
      icon: User,
    },
    {
      title: 'Orders',
      href: clientPaths.account.orders,
      icon: ShoppingBag,
    },
    {
      title: 'Address',
      href: clientPaths.account.address,
      icon: MapPin,
    },
    {
      title: 'Wishlist',
      href: clientPaths.account.wishlist,
      icon: Heart,
    },
    {
      title: 'Payment Methods',
      href: clientPaths.account.paymentMethods,
      icon: CreditCard,
    },
    {
      title: 'Settings',
      href: clientPaths.account.settings,
      icon: Settings,
    },
  ],
  footer: [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'modules',
      href: '/modules',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
  ],
};
