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
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    postalCode: string;
    city: string;
    state: string;
    phone: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    postalCode: string;
    city: string;
    state: string;
  };
  shippingMethod: {
    id: string;
    name: string;
  };
};
