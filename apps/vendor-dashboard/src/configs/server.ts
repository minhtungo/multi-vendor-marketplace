const basePath = '/api';
const authPath = `${basePath}/auth/vendor`;

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
    user: {
      me: `${authPath}/me`,
    },
    shop: {
      root: `${authPath}/shop`,
    },
    stripe: {
      createConnectLink: `${authPath}/stripe/create-connect-link`,
    },
  },
};
