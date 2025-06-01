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
    profile: '/account',
    orders: '/account/orders',
    address: '/account/address',
    wishlist: '/account/wishlist',
    settings: '/account/settings',
    paymentMethods: '/account/payment-methods',
  },
  shop: {
    root: '/shop',
    product: '/shop/product',
    category: '/shop/category',
    checkout: '/checkout',
    cart: '/cart',
  },
} as const;

const authPath = `/auth/user`;
const cartPath = `/cart`;

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
  cart: {
    retrieve: `${cartPath}`,
    update: `${cartPath}`,
    create: `${cartPath}`,
    addItem: `${cartPath}/items`,
    updateItem: `${cartPath}/items`,
    removeItem: `${cartPath}/items`,
  },
} as const;
