'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { type Cart } from '@repo/types/cart';

export const retrieveCart = async () => {
  await getOrCreateSessionId();

  const response = await api.get<Cart>(`${serverPaths.cart.retrieve}`, {
    next: {
      tags: ['cart'],
    },
  });

  return response.data;
};
