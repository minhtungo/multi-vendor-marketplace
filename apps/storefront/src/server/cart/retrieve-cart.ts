'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { type Cart } from '@repo/types/cart';

export const retrieveCart = async () => {
  const id = await getOrCreateSessionId();

  if (!id) {
    return null;
  }

  const response = await api.get<Cart>(`${serverPaths.cart.retrieve}`, {
    params: { sessionId: id },
  });

  return response.data;
};
