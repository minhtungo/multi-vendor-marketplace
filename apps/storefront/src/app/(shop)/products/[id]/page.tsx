import { getProduct } from '@/features/products/api/get-product';
import { ProductPreview } from '@/features/products/components/product-preview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
};

type Params = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductPreview product={product} />;
}
