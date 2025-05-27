import { Product } from '@repo/types/product';
import { Card, CardContent, CardHeader } from '@repo/ui/components/card';
import { Breadcrumb } from '@repo/ui/components/breadcrumb';
import { Heart, Minus, Plus, RotateCcw, Share2, Shield, ShoppingCart, Star, Truck } from '@repo/ui/icons';
import Image from 'next/image';
import { Button } from '@repo/ui/components/button';

type ProductPreviewProps = {
  product: Product;
};

export function ProductPreview({ product }: ProductPreviewProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: product.category, href: `/category/${product.category.toLowerCase()}` },
          { label: product.name },
        ]}
      /> */}

      <div className='grid lg:grid-cols-2 gap-12 mt-8'>
        {/* Product Images */}
        <div className='space-y-4'>
          <div className='relative aspect-square bg-gray-50 rounded-lg overflow-hidden'>
            <Image src={product.images[0]} alt={product.name} fill className='object-cover' priority />
            <Button variant='ghost' size='icon' className='absolute top-4 right-4 bg-white/80 hover:bg-white'>
              <Heart className='size-5' />
            </Button>
            <Button variant='ghost' size='icon' className='absolute top-16 right-4 bg-white/80 hover:bg-white'>
              <Share2 className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
              <span>{product.categories[0]}</span>
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

          {/* Add to Cart */}
          <div className='space-y-3'>
            <Button size='lg' className='w-full'>
              <ShoppingCart className='w-5 h-5 mr-2' />
              Add to Cart
            </Button>
            <Button variant='outline' size='lg' className='w-full'>
              Buy Now
            </Button>
          </div>

          <div className='grid grid-cols-3 gap-4 pt-6 border-t'>
            <div className='flex flex-col items-center text-center'>
              <Truck className='w-6 h-6 mb-2 text-primary' />
              <span className='text-sm font-medium'>Free Shipping</span>
              <span className='text-xs text-muted-foreground'>Orders over $50</span>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Shield className='w-6 h-6 mb-2 text-primary' />
              <span className='text-sm font-medium'>2 Year Warranty</span>
              <span className='text-xs text-muted-foreground'>Full coverage</span>
            </div>
            <div className='flex flex-col items-center text-center'>
              <RotateCcw className='w-6 h-6 mb-2 text-primary' />
              <span className='text-sm font-medium'>30-Day Returns</span>
              <span className='text-xs text-muted-foreground'>No questions asked</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='mt-16'>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div> */}
    </div>
  );
}
