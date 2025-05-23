import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
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
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
