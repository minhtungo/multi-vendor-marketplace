import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/settings/')({
  head: () => ({
    meta: [
      {
        title: 'Settings',
      },
    ],
  }),
  beforeLoad: async () => {
    throw redirect({ to: '/settings/profile' });
  },
});
