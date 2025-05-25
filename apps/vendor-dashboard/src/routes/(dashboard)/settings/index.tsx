import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/settings/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Settings',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/settings/"!</div>;
}
