import { useGetProducts } from '@/features/product/api/get-products';
import { productTableColumns } from '@/features/product/components/product-table/product-columns';
import { ProductTable } from '@/features/product/components/product-table/product-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/products/')({
  component: RouteComponent,
});

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
