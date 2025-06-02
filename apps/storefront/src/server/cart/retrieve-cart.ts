'use server';

import { serverPaths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { type Cart } from '@repo/types/cart';

export const retrieveCart = async () => {
  const response = await api.get<Cart>(`${serverPaths.cart.retrieve}`, {
    next: {
      tags: ['cart'],
    },
  });

  return response.data;
};
