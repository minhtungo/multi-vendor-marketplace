'use client';

import { Button } from '@repo/ui/components/button';
import { Minus, Plus } from '@repo/ui/icons';

type ProductQuantityActionProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  stock: number;
};

export function ProductQuantityAction({ quantity, onQuantityChange, stock }: ProductQuantityActionProps) {
  return (
    <div className='flex items-center gap-3'>
      <Button variant='outline' size='icon' onClick={() => onQuantityChange(quantity - 1)} disabled={quantity === 1}>
        <Minus />
      </Button>
      <span className='w-8 text-center font-semibold'>{quantity}</span>
      <Button variant='outline' size='icon' onClick={() => onQuantityChange(quantity + 1)} disabled={quantity >= stock}>
        <Plus />
      </Button>
    </div>
  );
}
