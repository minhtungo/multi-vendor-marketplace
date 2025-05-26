import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/products/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(dashboard)/products/$id"!</div>
}
