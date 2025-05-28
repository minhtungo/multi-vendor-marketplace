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

const authPath = `/auth/user`;

export const serverPaths = {
  auth: {
    signUp: `${authPath}/sign-up`,
    signIn: `${authPath}/sign-in`,
    verifyUser: `${authPath}/verify-user`,
    forgotPassword: `${authPath}/forgot-password`,
    resetPassword: `${authPath}/reset-password`,
    renewToken: `${authPath}/renew-token`,
    me: `${authPath}/me`,
  },
  user: {
    me: `${authPath}/me`,
  },
};
