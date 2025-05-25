import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/orders')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
