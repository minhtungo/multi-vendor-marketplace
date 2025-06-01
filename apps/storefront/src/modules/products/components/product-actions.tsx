'use client';

import { AddToCartButton } from '@/modules/products/components/add-to-cart-button';
import { QuantityButton } from '@/modules/products/components/quantity-button';
import { Product } from '@repo/types/product';
import { Button } from '@repo/ui/components/button';
import { useState } from 'react';

type ProductActionsProps = {
  product: Product;
};

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='space-y-3'>
      <QuantityButton quantity={quantity} onQuantityChange={setQuantity} />
      <AddToCartButton product={product} quantity={quantity} />
      <Button variant='outline' size='lg' className='w-full'>
        Buy Now
      </Button>
    </div>
  );
}
