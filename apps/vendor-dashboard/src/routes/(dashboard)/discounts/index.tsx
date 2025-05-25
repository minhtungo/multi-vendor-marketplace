import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/discounts/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Discounts',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/discounts/"!</div>;
}
