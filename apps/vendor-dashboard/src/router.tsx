import * as TanStackQueryProvider from '@/integrations/tanstack-query/provider';
import type { AuthActions } from '@/store/auth-store';
import type { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export type RouterContext = {
  queryClient: QueryClient;
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  initializeAuth: AuthActions['initializeAuth'];
};

export const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
    isAuthenticated: false,
    isAuthLoaded: false,
    initializeAuth: () => Promise.resolve(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
