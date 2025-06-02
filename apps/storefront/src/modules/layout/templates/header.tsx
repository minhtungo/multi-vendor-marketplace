import { Logo } from '@/modules/common/components/logo';
import { clientPaths } from '@/config/paths';
import { CartButton } from '@/modules/layout/components/cart-button';
import { MobileMenu } from '@/modules/layout/components/mobile-menu';
import { SearchBar } from '@/modules/layout/components/search-bar';
import { Button } from '@repo/ui/components/button';
import { User } from '@repo/ui/icons';
import Link from 'next/link';

export function Header() {
  return (
    <header className='sticky inset-x-0 w-full top-0 z-50 h-14 border-b backdrop-blur-md bg-background'>
      <div className='flex container flex-wrap items-center justify-between gap-6  h-full'>
        <div className='flex w-full justify-between lg:w-auto'>
          <Link href='/' aria-label='home' className='text-secondary-foreground'>
            <Logo />
          </Link>
          <MobileMenu className='lg:hidden cursor-pointer' />
        </div>
        <SearchBar className='hidden lg:block max-w-[400px] w-full' />
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost' asChild>
            <Link href={clientPaths.auth.signIn}>
              <User className='size-5' />
            </Link>
          </Button>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
