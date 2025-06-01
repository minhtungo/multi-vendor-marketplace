import { AddToCartButton } from '@/modules/products/components/add-to-cart-button';
import { ProductActions } from '@/modules/products/components/product-actions';
import { Product } from '@repo/types/product';
import { Button } from '@repo/ui/components/button';
import { Minus, Plus } from '@repo/ui/icons';
import Image from 'next/image';

type ProductPreviewProps = {
  product: Product;
};

export function ProductPreview({ product }: ProductPreviewProps) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='grid lg:grid-cols-2 gap-12 mt-8'>
      {/* Product Images */}
      <div className='relative aspect-square bg-gray-50 rounded-lg overflow-hidden'>
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Product Details */}
      <div className='space-y-6'>
        <div>
          <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2 capitalize'>
            <span>{product.categories[0].name}</span>
          </div>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>

          <div className='flex items-center gap-3 mb-6'>
            <span className='text-3xl font-bold'>${product.price}</span>
          </div>

          <p className='text-muted-foreground mb-6'>{product.description}</p>
        </div>

        <ProductActions product={product} />
      </div>
    </div>
  );
}
