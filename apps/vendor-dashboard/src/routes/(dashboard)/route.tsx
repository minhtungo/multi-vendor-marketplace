import { AppSidebar } from '@/components/app-sidebar';
import { client } from '@/configs/client';
import { SidebarProvider } from '@repo/ui/components/sidebar';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

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
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
      <main className="flex-1">
        <div className="overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
