'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { type Cart } from '@repo/types/cart';

export const updateCart = async (data: Cart) => {
  await getOrCreateSessionId();

  const response = await api.put<Cart>(`${serverPaths.cart.update}`, {
    ...data,
  });

  return response.data;
};
