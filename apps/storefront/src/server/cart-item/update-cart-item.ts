'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { CartItem } from '@repo/types/cart-item';
import { revalidateTag } from 'next/cache';

type UpdateCartItemData = {
  quantity: number;
};

export const updateCartItem = async (cartItemId: string, data: UpdateCartItemData) => {
  await getOrCreateSessionId();

  const response = await api.patch<CartItem>(`${serverPaths.cart.updateItem}/${cartItemId}`, {
    ...data,
  });

  revalidateTag('cart');

  return response.data;
};
