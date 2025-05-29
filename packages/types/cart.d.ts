export enum CART_STATUS {
  ACTIVE = 'active',
  CHECKOUT = 'checkout',
  ABANDONED = 'abandoned',
  COMPLETED = 'completed',
}

export type Cart = {
  id: string;
  userId: string;
  status: CART_STATUS;
  sessionId?: string;
  subtotal: string;
  total: string;
  currency: string;
  itemCount: number;
};

export type CartItem = {
  id: string;
  productId: string;
  price: string;
  quantity: number;
  total: string;
};
