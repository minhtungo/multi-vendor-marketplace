import { siteConfig } from '@/configs/site';
import { ConnectPayment } from '@/features/auth/components/connect-payment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: siteConfig.name,
      },
      {
        name: 'description',
        content: 'Welcome to the vendor dashboard',
      },
    ],
  }),
});

function App() {
  return (
    <div className="text-center">
      <ConnectPayment />
    </div>
  );
}
