'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { type Cart } from '@repo/types/cart';

interface AddToCartData {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export const addToCart = async (data: AddToCartData) => {
  await getOrCreateSessionId();

  const response = await api.post<Cart>(`${serverPaths.cart.create}/items`, {
    ...data,
  });

  console.log('response', response);

  return response.data;
};
