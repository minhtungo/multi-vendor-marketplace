import { User } from '@repo/types/user';

export const normalizeUser = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
  };
};
