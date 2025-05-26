const basePath = '/v1';
const authPath = `${basePath}/auth/vendor`;
const paymentPath = `${basePath}/payment`;
const productPath = `${basePath}/products`;
const productCategoryPath = `${productPath}/categories`;
const orderPath = `${basePath}/orders`;
const uploadPath = `${basePath}/uploads`;

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
      getAll: `${productPath}`,
    },
    productCategory: {
      root: `${productCategoryPath}`,
      create: `${productCategoryPath}`,
    },
    order: {
      root: `${orderPath}`,
    },
    upload: {
      root: `${uploadPath}`,
      confirmUpload: `${uploadPath}/confirm`,
      presignedUrl: `${uploadPath}/presigned-url`,
    },
  },
} as const;
