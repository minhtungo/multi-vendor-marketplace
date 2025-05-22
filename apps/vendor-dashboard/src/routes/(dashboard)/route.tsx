import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@repo/ui/components/sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)')({
  beforeLoad: async ({ context }) => {
    console.log('context', context);
    // if (!context.isAuthenticated) {
    //   throw redirect({ to: client.path.signIn });
    // }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex h-screen w-full flex-1 flex-col overflow-auto">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
