import { AppSidebar } from '@/components/app-sidebar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
    </div>
  );
}
