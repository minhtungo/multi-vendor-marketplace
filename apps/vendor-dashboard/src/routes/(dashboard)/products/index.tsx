import { DataTable } from '@/components/table/data-table';
import { useGetProducts } from '@/features/product/api/get-products';
import { productTableColumns } from '@/features/product/components/product-table/product-columns';
import { Button } from '@repo/ui/components/button';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/products/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Products',
      },
    ],
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProducts({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={productTableColumns}
      onRowClick={(row) => {
        navigate({ to: `/products/${row.id}` });
      }}
      data={data?.products ?? []}
      tableActions={
        <Button asChild>
          <Link to="/products/new">
            <Plus />
            Create
          </Link>
        </Button>
      }
    />
  );
}
