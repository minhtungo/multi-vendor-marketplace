import { Footer } from '@/modules/layout/templates/footer';
import { Header } from '@/modules/layout/templates/header';
import { Toaster } from 'sonner';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </div>
    </>
  );
}
