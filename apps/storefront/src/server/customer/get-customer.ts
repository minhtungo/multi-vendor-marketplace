import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { type User } from '@repo/types/user';

export const getCustomer = async () => {
  const response = await api.get<User>(serverPaths.auth.me);
  return response.data;
};
