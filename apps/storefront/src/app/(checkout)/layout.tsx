import { Logo } from '@/modules/common/components/logo';
import { CartButton } from '@/modules/layout/components/cart-button';
import Link from 'next/link';
import { Suspense } from 'react';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <div className='h-14'>
        <header className='container flex items-center h-full w-full gap-2 justify-between'>
          <Link href='/'>
            <Logo />
          </Link>
          <Suspense>
            <CartButton />
          </Suspense>
        </header>
      </div>
      <div className='pb-8 space-y-6'>{children}</div>
    </div>
  );
}
