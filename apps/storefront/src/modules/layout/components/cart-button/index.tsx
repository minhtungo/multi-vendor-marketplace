import { CartPopup } from '@/modules/layout/components/cart-button/cart-popup';
import { retrieveCart } from '@/server/cart/retrieve-cart';

export async function CartButton() {
  const cart = await retrieveCart().catch(() => null);
  return <CartPopup cartItems={cart?.items || []} />;
}
