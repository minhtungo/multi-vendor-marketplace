import { CartTemplate } from '@/modules/cart/templates';
import { retrieveCart } from '@/server/cart/retrieve-cart';

export default async function CartPage() {
  const cart = await retrieveCart();

  console.log('cart', cart);
  return <CartTemplate />;
}
