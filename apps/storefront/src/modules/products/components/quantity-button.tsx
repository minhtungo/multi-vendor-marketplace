'use client';

import { Button } from '@repo/ui/components/button';
import { Minus, Plus } from '@repo/ui/icons';

type QuantityButtonProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export function QuantityButton({ quantity, onQuantityChange }: QuantityButtonProps) {
  return (
    <div className='flex items-center gap-3'>
      <Button variant='outline' size='icon' onClick={() => onQuantityChange(quantity - 1)} disabled={quantity === 1}>
        <Minus className='h-4 w-4' />
      </Button>
      <span className='w-12 text-center font-semibold'>{quantity}</span>
      <Button variant='outline' size='icon' onClick={() => onQuantityChange(quantity + 1)}>
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
}
