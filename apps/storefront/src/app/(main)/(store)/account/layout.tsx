import { Sidebar } from '@/modules/account/components/sidebar';
import { Card, CardContent } from '@repo/ui/components/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col md:flex-row items-start gap-8'>
      <Sidebar />
      <Card className='flex-1'>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
