import { checkoutSteps, CheckoutStepSlug, defaultCheckoutStep } from '@/lib/constants/checkout';
import { CheckoutForm } from '@/modules/checkout/templates/checkout-form';
import { CheckoutSummary } from '@/modules/checkout/templates/checkout-summary';
import { retrieveCart } from '@/server/cart/retrieve-cart';
import { notFound } from 'next/navigation';

type CheckoutTemplateProps = {
  step: CheckoutStepSlug;
};

export async function CheckoutTemplate({ step }: CheckoutTemplateProps) {
  const cart = await retrieveCart();

  if (!cart) return notFound();

  const currentStep = checkoutSteps.find((s) => s.slug === step) || defaultCheckoutStep;

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
      <CheckoutForm cart={cart} className='lg:col-span-2 h-fit' currentStep={currentStep.slug} />
      <CheckoutSummary cart={cart} className='lg:sticky lg:top-8 h-fit' currentStep={currentStep.slug} />
    </div>
  );
}
