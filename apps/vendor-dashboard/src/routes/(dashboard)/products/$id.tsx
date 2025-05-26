import { getProductQueryOptions, useGetProduct } from '@/features/product/api/get-product';
import { Card } from '@repo/ui/components/card';
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
        title: loaderData?.name,
      },
    ],
  }),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: product } = useGetProduct(id);
  return <Card>{product?.name}</Card>;
}
