import { ProductActions } from '@/modules/products/components/product-actions';
import { Product } from '@repo/types/product';
import Image from 'next/image';
import Link from 'next/link';

type ProductPreviewProps = {
  product: Product;
};

export function ProductPreview({ product }: ProductPreviewProps) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='flex gap-12'>
      {/* Product Images */}
      <Image
        src={product.images[0] || '/placeholder.svg'}
        alt={product.name}
        width={500}
        height={500}
        className='object-cover rounded-lg aspect-square'
        priority
      />

      {/* Product Details */}
      <div className='space-y-6 flex-1'>
        <div>
          <Link
            className='hover:underline  text-sm text-muted-foreground mb-2 capitalize'
            href={`/categories/${product.categories[0].handle}`}
          >
            {product.categories[0].name}
          </Link>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>

          <div className='flex items-center gap-3 mb-6'>
            <span className='text-3xl font-bold'>${product.price}</span>
          </div>

          <p className='text-muted-foreground mb-6'>{product.description}</p>
        </div>

        <ProductActions product={product} className='mt-6' />
      </div>
    </div>
  );
}
