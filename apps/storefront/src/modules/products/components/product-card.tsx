import { type Product } from '@repo/types/product';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className='group relative'>
      <img
        alt={product.images[0]}
        src={product.images[0]}
        className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
      />
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-foreground/80'>
            <a href={`/products/${product.handle}`}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </a>
          </h3>
        </div>
        <p className='text-sm font-medium text-foreground'>{product.price}</p>
      </div>
    </div>
  );
}
