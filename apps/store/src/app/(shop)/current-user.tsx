'use client';

import { useUser } from '@/api/auth/get-user';

type CurrentUserProps = React.ComponentProps<'div'>;

export function CurrentUser({}: CurrentUserProps) {
  const { data: user } = useUser();

  if (!user) {
    return <div>Guest</div>;
  }

  return <div>{user.email}</div>;
}
