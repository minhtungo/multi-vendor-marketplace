import { menu } from '@/configs/menu';
import { buttonVariants } from '@repo/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover';
import { cn } from '@repo/ui/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';

type MobileMenuProps = React.ComponentProps<'div'>;

export function MobileMenu({ className }: MobileMenuProps) {
  return (
    <Popover>
      <PopoverTrigger className={cn(className)}>
        <Menu className='text-secondary-foreground' />
      </PopoverTrigger>
      <PopoverContent className='p-1 w-56' align='end' side='bottom'>
        <ul className='flex flex-col w-full'>
          {menu.header.map((item) => (
            <li key={`mobile-menu-${item.title}`}>
              <Link href={item.href} className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start')}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
