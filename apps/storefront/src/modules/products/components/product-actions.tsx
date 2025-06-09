'use client';

import { AddToCartButton } from '@/modules/products/components/add-to-cart-button';
import { ProductQuantityAction } from '@/modules/products/components/product-quantity-action';
import { Product } from '@repo/types/product';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';

type ProductActionsProps = {
  product: Product;
  className?: string;
};

export function ProductActions({ product, className }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <div className={cn('max-w-[500px] space-y-6', className)}>
      <ProductQuantityAction quantity={quantity} onQuantityChange={handleQuantityChange} stock={product.stock} />
      <div className='flex flex-col gap-2'>
        <AddToCartButton product={product} quantity={quantity} />
        <Button variant='outline' size='lg' className='w-full'>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
