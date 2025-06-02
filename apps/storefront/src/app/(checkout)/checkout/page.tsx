import { CheckoutTemplate } from '@/modules/checkout/templates';
import { SkeletonCheckoutPage } from '@/modules/skeletons/templates/skeleton-checkout-page';
import { Suspense } from 'react';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<SkeletonCheckoutPage />}>
      <CheckoutTemplate />
    </Suspense>
  );
}
