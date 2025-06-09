export const uploadConfig = {
  maxFileSize: 1024 * 1024 * 5, // 5MB
  presignedUrl: {
    expiresIn: 60 * 5, // 5 minutes
  },
};
