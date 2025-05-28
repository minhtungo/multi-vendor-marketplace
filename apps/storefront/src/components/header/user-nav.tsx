import { getUser } from '@/api/auth/get-user';
import { clientPaths } from '@/configs/paths';
import { Button } from '@repo/ui/components/button';
import { User } from '@repo/ui/icons';
import Link from 'next/link';

type UserNavProps = React.ComponentProps<'div'>;

export async function UserNav({}: UserNavProps) {
  const user = await getUser();
  return (
    <Button size='icon' variant='ghost' asChild>
      <Link href={user ? clientPaths.account.root : clientPaths.auth.signIn}>
        <User className='size-5' />
      </Link>
    </Button>
  );
}
