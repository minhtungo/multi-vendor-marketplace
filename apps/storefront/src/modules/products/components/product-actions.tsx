'use client';

import { AddToCartButton } from '@/modules/products/components/add-to-cart-button';
import { ProductQuantityAction } from '@/modules/products/components/product-quantity-action';
import { updateCartItem } from '@/server/cart-item/update-cart-item';
import { Product } from '@repo/types/product';
import { Button } from '@repo/ui/components/button';
import { useState } from 'react';

type ProductActionsProps = {
  product: Product;
};

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <div className='space-y-3'>
      <ProductQuantityAction quantity={quantity} onQuantityChange={handleQuantityChange} />
      <AddToCartButton product={product} quantity={quantity} />
      <Button variant='outline' size='lg' className='w-full'>
        Buy Now
      </Button>
    </div>
  );
}
