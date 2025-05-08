import { AuthButtons } from '@/components/auth-buttons';
import { Logo } from '@/components/logo';
import { MobileMenu } from '@/components/mobile-menu';
import { SearchBar } from '@/components/search-bar';
import { client } from '@/configs/client';
import { menu } from '@/configs/menu';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { Heart, ShoppingBag, User } from 'lucide-react';
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
          {/* <nav className='hidden lg:block'>
            <ul className='flex gap-6 text-sm'>
              {menu.main.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={buttonVariants({ variant: 'link' })}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
          <div className='flex items-center gap-2'>
            <Button size='icon' variant='ghost' asChild>
              <Link href={client.path.signIn}>
                <User className='size-5' />
              </Link>
            </Button>
            <Button size='icon' variant='ghost' asChild>
              <Link href={client.path.wishlist}>
                <Heart className='size-5' />
              </Link>
            </Button>
            <Button size='icon' variant='ghost' asChild>
              <Link href={client.path.cart} className='relative'>
                <ShoppingBag className='size-5' />
                <span className='absolute right-0 top-0 rounded-full bg-primary text-xs text-primary-foreground w-4 h-4 flex items-center justify-center'>
                  0
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
