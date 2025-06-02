import { CheckoutForm } from '@/modules/checkout/templates/checkout-form';
import { CheckoutSummary } from '@/modules/checkout/templates/checkout-summary';
import { retrieveCart } from '@/server/cart/retrieve-cart';

type CheckoutTemplateProps = {};

export async function CheckoutTemplate({}: CheckoutTemplateProps) {
  const cart = await retrieveCart();

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
      <CheckoutForm cart={cart} className='lg:col-span-2 h-fit' />
      <CheckoutSummary cart={cart} className='lg:sticky lg:top-8 h-fit' />
    </div>
  );
}
