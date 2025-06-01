import { Logo } from '@/components/common/logo';
import { clientPaths } from '@/configs/paths';
import { CartButton } from '@/modules/layout/components/cart-button';
import { MobileMenu } from '@/modules/layout/components/mobile-menu';
import { SearchBar } from '@/modules/layout/components/search-bar';
import { Button } from '@repo/ui/components/button';
import { User } from '@repo/ui/icons';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

type HeaderProps = React.ComponentProps<'div'>;

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky z-20 w-full h-16 flex items-center transition-all duration-100 backdrop-blur-md',
        className
      )}
    >
      <div className={cn('container transition-all duration-300')}>
        <div className='relative flex flex-wrap items-center justify-between gap-6 lg:gap-0'>
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
      </div>
    </header>
  );
}
