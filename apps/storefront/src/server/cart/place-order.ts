'use server';

import { serverPaths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { Cart } from '@repo/types/cart';
import { revalidateTag } from 'next/cache';

export async function placeOrder() {
  try {
    const response = await api.post<Cart>(`${serverPaths.cart.complete}`);

    revalidateTag('cart');

    return {
      success: true,
      message: 'Order placed successfully',
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}
