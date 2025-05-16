const basePath = '/api';
const authPath = `${basePath}/auth/vendor`;
const vendorPath = `${basePath}/vendor`;

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
      createConnectLink: `${vendorPath}/payment/create-connect-link`,
    },
  },
};
