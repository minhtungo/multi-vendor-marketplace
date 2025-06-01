'use client';

import { QuantityButton } from '@/modules/products/components/quantity-button';
import { type CartItem } from '@repo/types/cart-item';
import { Button } from '@repo/ui/components/button';
import { Heading } from '@repo/ui/components/heading';
import { Trash2 } from '@repo/ui/icons';
import Image from 'next/image';
import { useState } from 'react';

type CartItemProps = React.ComponentProps<'div'> & {
  item: CartItem;
};

export function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div key={`cart-item-${item.id}`}>
      <div className='flex items-start gap-4'>
        <div className='flex-shrink-0'>
          <Image
            src={'/placeholder.svg'}
            alt={item.productName}
            width={120}
            height={120}
            className='rounded-lg object-cover'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 justify-between'>
            <Heading variant='h5' as='h3'>
              {item.productName}
            </Heading>
            <p className='text-lg font-semibold'>${item.total}</p>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <QuantityButton quantity={quantity} onQuantityChange={setQuantity} />

            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='icon'>
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
