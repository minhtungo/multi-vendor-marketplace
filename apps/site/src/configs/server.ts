const basePath = '/api';

export const server = {
  path: {
    auth: {
      signUp: `${basePath}/sign-up`,
      signIn: `${basePath}/sign-in`,
      verifyUser: `${basePath}/verify-user`,
    },
  },
};
