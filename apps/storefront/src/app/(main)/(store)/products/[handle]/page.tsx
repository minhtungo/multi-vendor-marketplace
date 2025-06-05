import { ProductPreview } from '@/modules/products/templates/product-preview';
import { getProduct } from '@/server/product/get-product';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.images[0],
    },
  };
}

type Params = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  return <ProductPreview product={product} />;
}
