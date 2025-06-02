import { Logo } from '@/modules/common/components/logo';
import Link from 'next/link';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <div className='h-14 border-b'>
        <header className='container  flex items-center h-full w-full'>
          <Link href='/'>
            <Logo />
          </Link>
        </header>
      </div>
      <div className='container py-8'>{children}</div>
    </div>
  );
}
