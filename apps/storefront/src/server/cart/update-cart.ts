'use server';

import { serverPaths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { type Cart } from '@repo/types/cart';

export const updateCart = async (data: Cart) => {
  const response = await api.put<Cart>(`${serverPaths.cart.update}`, data);

  return response.data;
};
