import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/customers')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
