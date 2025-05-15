import { AppSidebar } from '@/components/app-sidebar';
import { client } from '@/configs/client';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: client.path.signIn });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
    </div>
  );
}
