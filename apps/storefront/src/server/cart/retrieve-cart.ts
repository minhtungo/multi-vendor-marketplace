'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getCartId } from '@/lib/cookies';
import { type Cart } from '@repo/types/cart';

export const retrieveCart = async (cartId?: string) => {
  const id = cartId || (await getCartId());

  const response = await api.get<Cart>(`${serverPaths.cart.retrieve}/${id}`);
  return response.data;
};
