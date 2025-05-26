import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/settings/profile')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Profile',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/settings/profile"!</div>;
}
