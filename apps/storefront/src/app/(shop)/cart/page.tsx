import { SkeletonCartPage } from '@/modules/skeletons/templates/skeleton-cart-page';
import { CartTemplate } from '@/modules/cart/templates';
import { Suspense } from 'react';

export default async function CartPage() {
  return (
    <Suspense fallback={<SkeletonCartPage />}>
      <CartTemplate />
    </Suspense>
  );
}
