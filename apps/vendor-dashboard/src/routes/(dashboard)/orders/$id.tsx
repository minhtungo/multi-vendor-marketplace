import { getOrderQueryOptions } from '@/features/orders/api/get-order';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/orders/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData({
      ...getOrderQueryOptions(params.id),
    });
  },

  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Order #${loaderData?.id}`,
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/orders/$id"!</div>;
}
