import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/customers/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Customers',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/customers/"!</div>;
}
