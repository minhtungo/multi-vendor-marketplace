const BASE_PATH = '/v1';
const AUTH_BASE = `${BASE_PATH}/auth/vendor`;
const PAYMENT_BASE = `${BASE_PATH}/payment`;
const PRODUCT_BASE = `${BASE_PATH}/products`;
const PRODUCT_CATEGORY_BASE = `${PRODUCT_BASE}/categories`;
const ORDER_BASE = `${BASE_PATH}/orders`;
const UPLOAD_BASE = `${BASE_PATH}/uploads`;

export const api = {
  auth: {
    signUp: `${AUTH_BASE}/sign-up`,
    signIn: `${AUTH_BASE}/sign-in`,
    verifyUser: `${AUTH_BASE}/verify`,
    forgotPassword: `${AUTH_BASE}/forgot-password`,
    resetPassword: `${AUTH_BASE}/reset-password`,
    renewToken: `${AUTH_BASE}/renew-token`,
    me: `${AUTH_BASE}/me`,
    signOut: `${AUTH_BASE}/sign-out`,
  },
  shop: {
    root: `${AUTH_BASE}/shop`,
  },
  payment: {
    connect: `${PAYMENT_BASE}/create-connect-link`,
  },
  products: {
    all: PRODUCT_BASE,
    single: (id: string) => `${PRODUCT_BASE}/${id}`,
  },
  productCategories: {
    all: PRODUCT_CATEGORY_BASE,
    single: (id: string) => `${PRODUCT_CATEGORY_BASE}/${id}`,
  },
  orders: {
    all: ORDER_BASE,
    single: (id: string) => `${ORDER_BASE}/${id}`,
  },
  uploads: {
    all: UPLOAD_BASE,
    single: (id: string) => `${UPLOAD_BASE}/${id}`,
    confirmUpload: `${UPLOAD_BASE}/confirm`,
    presignedUrl: `${UPLOAD_BASE}/presigned-url`,
  },
} as const;
