'use client';

import { addToCart } from '@/server/cart/add-to-cart';
import { Product } from '@repo/types/product';
import { Button } from '@repo/ui/components/button';
import { ShoppingCart } from '@repo/ui/icons';

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleAddToCart = async () => {
    const response = await addToCart({
      productId: product.id,
      quantity: 1,
      price: product.price,
      productName: product.name,
      productImage: product.images[0] || 'asd',
      total: product.price,
    });
  };
  return (
    <Button size='lg' className='w-full' onClick={handleAddToCart}>
      <ShoppingCart className='w-5 h-5 mr-2' />
      Add to Cart
    </Button>
  );
}
