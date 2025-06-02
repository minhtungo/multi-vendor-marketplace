import { ProfileTemplate } from '@/modules/account/templates/profile-template';
import { CardDescription, CardTitle } from '@repo/ui/components/card';
import { Suspense } from 'react';

export default function AccountPage() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile</CardDescription>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileTemplate />
      </Suspense>
    </div>
  );
}
