import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Dashboard',
      },
    ],
  }),
});

function App() {
  return <div className="text-center"></div>;
}
