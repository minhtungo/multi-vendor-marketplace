import { NavAccount } from '@/modules/account/components/nav-account';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';

type SidebarProps = {};

export function Sidebar({}: SidebarProps) {
  return (
    <Card className='w-full w-64 hidden lg:block shrink-0'>
      <CardHeader className='pb-4 px-4'>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account</CardDescription>
      </CardHeader>
      <CardContent className='px-4'>
        <NavAccount />
      </CardContent>
    </Card>
  );
}
