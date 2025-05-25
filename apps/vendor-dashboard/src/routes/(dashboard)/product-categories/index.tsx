import { DataTable } from '@/components/table/data-table';
import { useGetProductCategoriesQuery } from '@/features/product-categories/api/get-product-categories';
import { categoriesColumns } from '@/features/product-categories/components/categories-table/categories-columns';
import { Button } from '@repo/ui/components/button';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/product-categories/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Product Categories',
      },
    ],
  }),
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetProductCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={categoriesColumns}
      data={data ?? []}
      onRowClick={(row) => {
        navigate({ to: `/product-categories/${row.id}` });
      }}
      tableActions={
        <Button asChild>
          <Link to="/product-categories/new">
            <Plus />
            Create
          </Link>
        </Button>
      }
    />
  );
}
