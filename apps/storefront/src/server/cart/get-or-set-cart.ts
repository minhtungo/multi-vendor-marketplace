'use server';

import { createCart } from '@/server/cart/create-cart';
import { retrieveCart } from '@/server/cart/retrieve-cart';

export const getOrSetCart = async (cartId?: string) => {
  let cart = await retrieveCart(cartId);

  if (!cart) {
    cart = await createCart();
  }

  return cart;
};
