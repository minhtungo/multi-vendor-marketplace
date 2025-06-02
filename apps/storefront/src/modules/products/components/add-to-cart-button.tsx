'use client';

import { addToCart } from '@/server/cart/add-to-cart';
import { Product } from '@repo/types/product';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { ShoppingCart } from '@repo/ui/icons';
import { useState } from 'react';
import { toast } from 'sonner';

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
};

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleAddToCart = async () => {
    setIsPending(true);
    await addToCart({
      productId: product.id,
      quantity,
      price: product.price,
      productName: product.name,
      productImage: product.images[0] || '',
      total: product.price,
    });
    setIsPending(false);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <LoaderButton size='lg' className='w-full' onClick={handleAddToCart} isPending={isPending}>
      <ShoppingCart className='w-5 h-5' />
      Add to Cart
    </LoaderButton>
  );
}
