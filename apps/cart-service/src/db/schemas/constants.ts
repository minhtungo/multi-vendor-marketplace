import { pgEnum } from 'drizzle-orm/pg-core';

export enum CART_STATUS {
  ACTIVE = 'active',
  CHECKOUT = 'checkout',
  ABANDONED = 'abandoned',
  COMPLETED = 'completed',
}

export const cartStatus = pgEnum('cart_status', [
  CART_STATUS.ACTIVE,
  CART_STATUS.CHECKOUT,
  CART_STATUS.ABANDONED,
  CART_STATUS.COMPLETED,
]);
