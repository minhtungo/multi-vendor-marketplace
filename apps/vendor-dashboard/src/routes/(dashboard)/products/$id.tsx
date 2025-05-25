import { getProductQueryOptions } from '@/features/product/api/get-product';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/products/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { id } = params;
    return context.queryClient.ensureQueryData(getProductQueryOptions(id));
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.data.name,
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/products/$id"!</div>;
}
