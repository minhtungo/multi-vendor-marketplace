import { ProductCard } from '@/modules/products/components/product-card';
import { getProducts } from '@/server/product/get-products';

type FeaturedProductsProps = React.ComponentProps<'div'>;

export async function FeaturedProducts({}: FeaturedProductsProps) {
  const data = await getProducts({
    queryParams: {
      sort: 'price_desc',
      limit: 4,
      page: 1,
    },
  });

  if (!data) return <div>Error fetching products</div>;

  return (
    <ul className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {data?.products?.length > 0 ? (
        data.products?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))
      ) : (
        <li>No products found</li>
      )}
    </ul>
  );
}
