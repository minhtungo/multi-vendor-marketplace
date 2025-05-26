import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { type User } from '@repo/types/user';

export const getUser = async () => {
  const response = await api.get<User>(server.path.auth.me);
  return response.data;
};
