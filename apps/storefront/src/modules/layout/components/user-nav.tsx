import { getCustomer } from '@/server/customer/get-customer';
import { clientPaths } from '@/config/paths';
import { Button } from '@repo/ui/components/button';
import { User } from '@repo/ui/icons';
import Link from 'next/link';

type UserNavProps = React.ComponentProps<'div'>;

export async function UserNav({}: UserNavProps) {
  const customer = await getCustomer();
  return (
    <Button size='icon' variant='ghost' asChild>
      <Link href={customer ? clientPaths.account.root : clientPaths.auth.signIn}>
        <User className='size-5' />
      </Link>
    </Button>
  );
}
