const basePath = '/v1';
const authPath = `${basePath}/auth/vendor`;
const paymentPath = `${basePath}/payment`;
const productPath = `${basePath}/products`;

export const server = {
  path: {
    auth: {
      signUp: `${authPath}/sign-up`,
      signIn: `${authPath}/sign-in`,
      verifyUser: `${authPath}/verify`,
      forgotPassword: `${authPath}/forgot-password`,
      resetPassword: `${authPath}/reset-password`,
      renewToken: `${authPath}/renew-token`,
      me: `${authPath}/me`,
      signOut: `${authPath}/sign-out`,
    },
    shop: {
      root: `${authPath}/shop`,
    },
    payment: {
      connect: `${paymentPath}/create-connect-link`,
    },
    product: {
      root: `${productPath}`,
      create: `${productPath}`,
    },
    productCategory: {
      root: `${productPath}/categories`,
    },
  },
} as const;
