import { AddToCartButton } from '@/modules/products/components/add-to-cart-button';
import { Product } from '@repo/types/product';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Minus, Plus } from '@repo/ui/icons';
import Image from 'next/image';

type ProductQuickViewProps = {
  triggerButton: React.ReactElement;
  product: Product;
};

export function ProductQuickView({ triggerButton, product }: ProductQuickViewProps) {
  if (!product) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className='sm:max-w-4xl'>
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='relative aspect-square bg-gray-50 rounded-lg overflow-hidden'>
              <Image
                src={product.images[0] || '/placeholder.svg'}
                alt={product.name}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2 capitalize'>
                <span>{product.categories[0]?.name}</span>
              </div>
              <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>

              <div className='flex items-center gap-3 mb-6'>
                <span className='text-3xl font-bold'>${product.price}</span>
              </div>

              <p className='text-muted-foreground mb-6'>{product.description}</p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className='font-semibold mb-3'>Quantity</h3>
              <div className='flex items-center gap-3'>
                <Button variant='outline' size='icon'>
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-12 text-center font-semibold'>1</span>
                <Button variant='outline' size='icon'>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>

            <div className='space-y-3'>
              <AddToCartButton product={product} />
              <Button variant='outline' size='lg' className='w-full'>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
