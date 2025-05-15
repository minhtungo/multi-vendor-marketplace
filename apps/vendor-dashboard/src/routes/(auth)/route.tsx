import { client } from '@/configs/client';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context }) => {
    if (context.isAuthLoaded && context.isAuthenticated) {
      throw redirect({
        to: client.path.root,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-4 md:p-10">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
