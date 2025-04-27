export const tokenConfig = {
  accessToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  refreshToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  verificationToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  resetPasswordToken: {
    length: 32,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
