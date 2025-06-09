import type { RouterContext } from '@/router';
import { seo } from '@/utils/seo';
import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [...seo({})],
    links: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    if (!context.isAuthLoaded) {
      await context.initializeAuth();
    }
  },
  component: RootLayoutComponent,
});

function RootLayoutComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  );
}
