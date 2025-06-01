'use server';

import { serverPaths } from '@/configs/paths';
import { api } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { type Cart } from '@repo/types/cart';
import { revalidateTag } from 'next/cache';

type AddToCartData = {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: string;
  total: string;
};

export const addToCart = async (data: AddToCartData) => {
  await getOrCreateSessionId();

  const response = await api.post<Cart>(`${serverPaths.cart.create}/items`, data);

  if (!response.success) {
    throw new Error('Failed to add item to cart');
  }

  revalidateTag('cart');

  return response.data;
};
