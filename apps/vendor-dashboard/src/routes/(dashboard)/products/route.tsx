import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/products')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container flex w-full flex-col py-6">
      <Outlet />
    </div>
  );
}
