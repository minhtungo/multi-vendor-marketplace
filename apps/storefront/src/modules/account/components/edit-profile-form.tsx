'use client';

import { SubmitButton } from '@/components/common/submit-button';
import { FormItem } from '@/components/form/form-item';
import { updateProfile } from '@/server/account/update-profile';
import { type User } from '@repo/types/user';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { useActionState } from 'react';

type EditProfileFormProps = React.ComponentProps<'div'> & {
  customer?: User;
};

export function EditProfileForm({ customer, ...props }: EditProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='space-y-6'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormItem>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              autoComplete='name'
              defaultValue={customer?.name || ''}
              required
              data-testid='name-input'
            />
          </FormItem>
          <FormItem>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              defaultValue={customer?.email || ''}
              required
              data-testid='email-input'
            />
          </FormItem>
        </div>
        <FormItem>
          <Label htmlFor='image'>Profile Image URL</Label>
          <Input
            id='image'
            name='image'
            type='url'
            placeholder='https://example.com/your-image.jpg'
            defaultValue={customer?.image || ''}
            data-testid='image-input'
          />
        </FormItem>
      </div>
      {state && (
        <FormResponse
          title={state.success ? 'Success' : 'Error'}
          variant={state.success ? 'success' : 'destructive'}
          description={state?.message}
        />
      )}
      <div className='flex justify-end'>
        <SubmitButton>Update Profile</SubmitButton>
      </div>
    </form>
  );
}
