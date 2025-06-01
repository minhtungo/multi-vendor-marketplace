'use client';

import { clientPaths } from '@/configs/paths';
import { CartItem } from '@repo/types/cart-item';
import { Button } from '@repo/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover';
import { ShoppingBag } from '@repo/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

type CartPopupProps = {
  cartItems: CartItem[];
};

export function CartPopup({ cartItems }: CartPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          asChild
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link href={clientPaths.shop.cart} className='relative'>
            <ShoppingBag className='size-5' />
            <span className='absolute right-0 top-0 rounded-full bg-primary text-xs text-primary-foreground p-[2px] flex items-center justify-center'>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </Link>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => (
            <div key={item.id}>{item.productName}</div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
