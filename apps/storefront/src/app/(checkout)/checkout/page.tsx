import { CheckoutStepSlug } from '@/lib/constants/checkout';
import { CheckoutTemplate } from '@/modules/checkout/templates';
import { SkeletonCheckoutPage } from '@/modules/skeletons/templates/skeleton-checkout-page';
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
      <CheckoutTemplate step={step} />
    </Suspense>
  );
}
