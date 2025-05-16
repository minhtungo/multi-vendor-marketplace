import { AppSidebar } from '@/components/app-sidebar';
import { client } from '@/configs/client';
import { SidebarInset, SidebarProvider } from '@repo/ui/components/sidebar';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)')({
  beforeLoad: async ({ context }) => {
    console.log('context', context);
    if (!context.isAuthenticated) {
      throw redirect({ to: client.path.signIn });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <main className="w-full flex-1">
            <div className="w-full overflow-auto p-4">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
