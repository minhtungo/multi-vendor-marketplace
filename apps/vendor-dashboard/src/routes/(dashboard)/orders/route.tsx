import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/orders')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container flex w-full flex-col overflow-hidden py-6">
      <Outlet />
    </div>
  );
}
