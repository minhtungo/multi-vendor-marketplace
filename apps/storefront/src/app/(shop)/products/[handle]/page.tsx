import { ProductPreview } from '@/modules/products/templates/product-preview';
import { getProduct } from '@/server/product/get-product';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
};

type Params = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = await getProduct(handle);

  return <ProductPreview product={product} />;
}
