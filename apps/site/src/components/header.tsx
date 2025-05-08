import { Logo } from '@/components/logo';
import { MobileMenu } from '@/components/mobile-menu';
import { menu } from '@/configs/menu';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

type HeaderProps = React.ComponentProps<'div'>;

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky z-20 w-full h-14 flex items-center transition-all duration-100 backdrop-blur-md',
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

          <nav className='hidden lg:block'>
            <ul className='flex gap-6 text-sm'>
              {menu.header.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={buttonVariants({ variant: 'link' })}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button size='sm'>Sign in</Button>
        </div>
      </div>
    </header>
  );
}
