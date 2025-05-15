import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stripe/connect/return')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/stripe/connect/return"!</div>;
}
