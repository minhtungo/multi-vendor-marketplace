import type { CartItem } from './cart-item';

export enum CART_STATUS {
  ACTIVE = 'active',
  CHECKOUT = 'checkout',
  ABANDONED = 'abandoned',
  COMPLETED = 'completed',
}

export type Cart = {
  id: string;
  userId: string | undefined;
  sessionId: string | undefined;
  status: CART_STATUS;
  sessionId: string | undefined;
  subtotal: string;
  total: string;
  itemCount: number;
  items: CartItem[];
  email: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    address_1: string;
    postal_code: string;
    city: string;
    state: string;
    phone: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    address_1: string;
    postal_code: string;
    city: string;
    state: string;
  };
};
