'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { type Cart } from '@repo/types/cart';

interface AddToCartData {
  productId: string;
  quantity: number;
  price: number;
}

export const addToCart = async (data: AddToCartData) => {
  await getOrCreateSessionId();

  const response = await api.post<Cart>(`${serverPaths.cart.create}/items`, {
    ...data,
  });

  return response.data;
};
