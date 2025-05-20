export const appConfig = {
  upload: {
    maxFileSize: 30 * 1024 * 1024,
    presignedUrl: {
      expiresIn: 600,
    },
  },
  rootPath: '/api',
};
