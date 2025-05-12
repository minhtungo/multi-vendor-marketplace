import { siteConfig } from '@/configs/site'
import type { RouterContext } from '@/router'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        title: siteConfig.name,
      },
      {
        name: 'description',
        content: siteConfig.name,
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  component: RootLayoutComponent,
})

function RootLayoutComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  )
}
