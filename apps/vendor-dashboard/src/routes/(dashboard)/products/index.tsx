import { useGetProducts } from '@/features/product/api/get-products';
import { productTableColumns } from '@/features/product/components/product-table/product-columns';
import { ProductTable } from '@/features/product/components/product-table/product-table';
import type { Product } from '@/types/product';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/products/')({
  component: RouteComponent,
});

const PRODUCTS: Product[] = [
  {
    name: 'Product 1',
    description: 'Product 1 description',
    price: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sku: '1234567890',
    compareAtPrice: 100,
    quantity: 100,
    images: [
      'https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/ss25_anthony_edwards_1_metal_gray_launch_hp_tc_d_cc639b5e32.jpg',
    ],
    categories: [],
    tags: [],
    metadata: {},
  },
  {
    name: 'Product 2',
    description: 'Product 2 description',
    price: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sku: '1234567890',
    compareAtPrice: 200,
    quantity: 200,
    images: [
      'https://assets.adidas.com/images/w_600,f_auto,q_auto/d2deb602a1264dad9638df7f98a89ec1_9366/Gazelle_Indoor_Shoes_Green_JQ0174_00_plp_standard.jpg',
    ],
    categories: [],
    tags: [],
    metadata: {},
  },
];

function RouteComponent() {
  const { data, isLoading } = useGetProducts({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ProductTable columns={productTableColumns} data={data?.products ?? []} />;
}
