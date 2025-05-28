export const clientPaths = {
  home: '/',
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  account: {
    root: '/account',
    profile: '/account/profile',
    orders: '/account/orders',
    address: '/account/address',
    wishlist: '/account/wishlist',
  },
  shop: {
    root: '/shop',
    product: '/shop/product',
    category: '/shop/category',
  },
} as const;
