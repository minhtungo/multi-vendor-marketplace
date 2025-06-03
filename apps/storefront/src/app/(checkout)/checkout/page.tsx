import { CheckoutStepSlug } from '@/lib/constants/checkout';
import { CheckoutStepper } from '@/modules/checkout/components/checkout-stepper';
import { CheckoutTemplate } from '@/modules/checkout/templates';
import { SkeletonCheckoutPage } from '@/modules/skeletons/templates/skeleton-checkout-page';
import { Heading } from '@repo/ui/components/heading';
import { Suspense } from 'react';

type Params = {
  searchParams: Promise<{
    step?: CheckoutStepSlug;
  }>;
};

export default async function CheckoutPage({ searchParams }: Params) {
  const { step = 'shipping' } = await searchParams;

  return (
    <Suspense fallback={<SkeletonCheckoutPage />}>
      <div className='bg-card'>
        <div className='flex py-4 justify-between container'>
          <Heading level='h1' size='h4'>
            Checkout
          </Heading>
          <CheckoutStepper step={step} className='max-w-md' />
        </div>
      </div>
      <CheckoutTemplate step={step} className='container' />
    </Suspense>
  );
}
