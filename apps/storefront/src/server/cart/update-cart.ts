'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getCartId } from '@/lib/cookies';
import { type Cart, type CartItem } from '@repo/types/cart';

export const updateCart = async (data: { cartId?: string; items: CartItem[] }) => {
  const id = data.cartId || (await getCartId());

  const response = await api.put<Cart>(`${serverPaths.cart.update}/${id}`, data);
  return response.data;
};
