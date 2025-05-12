import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import * as TanStackQueryProvider from '@/integrations/tanstack-query/provider'
import type { QueryClient } from '@tanstack/react-query'

export type RouterContext = {
  queryClient: QueryClient
}

export const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
