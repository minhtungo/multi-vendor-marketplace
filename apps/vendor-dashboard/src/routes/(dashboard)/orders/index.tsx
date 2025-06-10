import { DataTable } from '@/components/table/data-table';
import { getOrdersQueryOptions, useGetOrders } from '@/features/orders/api/get-orders';
import { orderTableColumns } from '@/features/orders/components/orders-table/order-columns';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/orders/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    return context.queryClient.ensureInfiniteQueryData({
      ...getOrdersQueryOptions({ page: 1, limit: 10 }),
      initialPageParam: 1,
    });
  },
  head: () => ({
    meta: [
      {
        title: 'Orders',
      },
    ],
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: orders } = useGetOrders({ page: 1, limit: 10 });

  return (
    <DataTable
      columns={orderTableColumns}
      data={orders?.pages.flatMap((page) => page.orders) ?? []}
      onRowClick={(row) => {
        navigate({ to: '/orders/$id', params: { id: row.id.toString() } });
      }}
      noResultsText="No orders found"
    />
  );
}
