export enum CART_STATUS {
  ACTIVE = 'active',
  CHECKOUT = 'checkout',
  ABANDONED = 'abandoned',
  COMPLETED = 'completed',
}

export type Cart = {
  id: string;
  userId: string | undefined;
  status: CART_STATUS;
  sessionId: string | undefined;
  subtotal: string;
  total: string;
  itemCount: number;
};
