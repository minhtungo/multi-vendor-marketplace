import { type Product } from '@repo/types/product';
import { formatPrice } from '@repo/shared/utils';
import Image from 'next/image';
import { ProductQuickView } from '@/modules/products/templates/product-quick-view';
import { Button } from '@repo/ui/components/button';
import { Eye } from '@repo/ui/icons';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className='group relative'>
      <Image
        alt={product.name}
        src={product.images[0] || '/placeholder.svg'}
        width={400}
        height={400}
        className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
      />
      <div className='flex flex-col gap-2 opacity-0 group-hover:opacity-100 absolute top-2 right-2 z-10'>
        <ProductQuickView
          triggerButton={
            <Button variant='outline' size='icon' className='rounded-full'>
              <Eye />
            </Button>
          }
          product={product}
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-foreground/80'>
            <a href={`/products/${product.handle}`}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </a>
          </h3>
        </div>
        <p className='text-sm font-medium text-foreground'>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
