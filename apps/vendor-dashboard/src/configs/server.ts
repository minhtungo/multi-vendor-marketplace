const basePath = '/v1';
const authPath = `${basePath}/auth/vendor`;
const vendorPath = `${basePath}/vendor`;
const paymentPath = `${basePath}/payment`;

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
      root: `${vendorPath}/product`,
      create: `${vendorPath}/product`,
    },
    productCategory: {
      root: `${vendorPath}/product-category`,
    },
  },
} as const;
