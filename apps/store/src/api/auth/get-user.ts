import { server } from '@/configs/server';
import { api } from '@/lib/api-client';
import { User } from '@/types/user';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUser = async () => {
  const response = await api.get<User>(server.path.user.me);
  return response.data;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => {
  return useQuery(getUserQueryOptions());
};
