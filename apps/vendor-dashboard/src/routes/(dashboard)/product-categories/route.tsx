import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/product-categories')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
