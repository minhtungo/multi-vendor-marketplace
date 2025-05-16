import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/payment/connect/refresh')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/stripe/connect/refresh"!</div>
}
