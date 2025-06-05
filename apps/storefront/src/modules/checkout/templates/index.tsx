import { checkoutSteps, CheckoutStepSlug, defaultCheckoutStep } from '@/lib/constants/checkout';
import { PaymentWrapper } from '@/modules/checkout/components/payment/payment-wrapper';
import { CheckoutForm } from '@/modules/checkout/templates/checkout-form';
import { CheckoutSummary } from '@/modules/checkout/templates/checkout-summary';
import { retrieveCart } from '@/server/cart/retrieve-cart';
import { cn } from '@repo/ui/lib/utils';
import { redirect } from 'next/navigation';

type CheckoutTemplateProps = {
  step: CheckoutStepSlug;
  className?: string;
};

export async function CheckoutTemplate({ step, className }: CheckoutTemplateProps) {
  const cart = await retrieveCart();

  if (!cart || cart.items.length === 0) redirect('/cart');

  const currentStep = checkoutSteps.find((s) => s.slug === step) || defaultCheckoutStep;

  return (
    <PaymentWrapper cart={cart}>
      <div className={cn('grid grid-cols-1 gap-8 lg:grid-cols-3', className)}>
        <CheckoutForm cart={cart} className='lg:col-span-2 h-fit' currentStep={currentStep.slug} />
        <CheckoutSummary cart={cart} className='lg:sticky lg:top-8 h-fit' />
      </div>
    </PaymentWrapper>
  );
}
