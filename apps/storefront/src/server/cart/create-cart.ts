'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { setCartId } from '@/lib/cookies';
import { type Cart } from '@repo/types/cart';

export const createCart = async () => {
  const response = await api.post<Cart>(serverPaths.cart.create);
  await setCartId(response.data.id);
  return response.data;
};
