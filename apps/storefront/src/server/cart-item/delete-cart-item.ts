'use server';

import { serverPaths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { type Cart } from '@repo/types/cart';
import { revalidateTag } from 'next/cache';

export const deleteCartItem = async (cartItemId: string) => {
  const response = await api.delete<Cart>(`${serverPaths.cart.removeItem}/${cartItemId}`);

  if (!response.success) {
    throw new Error('Failed to remove item from cart');
  }

  revalidateTag('cart');

  return response.data;
};
