'use client';

import { menu } from '@/configs/menu';
import { buttonVariants } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavAccountProps = React.ComponentProps<'div'>;

export function NavAccount({}: NavAccountProps) {
  const pathname = usePathname();
  return (
    <nav className='flex flex-col gap-2'>
      {menu.account.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start', pathname === item.href && 'bg-accent')}
        >
          <item.icon />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
