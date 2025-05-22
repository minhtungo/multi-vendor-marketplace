import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/orders')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header className="flex h-14 w-full items-center justify-between border-b p-4">
        <h1 className="text-xl font-bold">Orders</h1>
      </header>
      <main className="flex h-full w-full flex-col overflow-y-auto">
        <div className="container flex w-full flex-col py-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
