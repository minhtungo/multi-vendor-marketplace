import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/payment/connect/return')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/stripe/connect/return"!</div>;
}
