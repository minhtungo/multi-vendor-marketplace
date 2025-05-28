import { verifyResetPasswordToken } from '@/server/auth/reset-password';
import { AuthContainer } from '@/modules/auth/components/common/auth-container';
import { ResetPasswordContainer } from '@/modules/auth/components/reset-password-form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Suspense } from 'react';

const ResetPassword = async ({ searchParams }: { searchParams: { token: string } }) => {
  const { token } = searchParams;

  if (!token) {
    return <FormResponse title='Error' description='Invalid token' variant='destructive' />;
  }

  const tokenValidationPromise = verifyResetPasswordToken(token);

  return (
    <AuthContainer title='Reset Password' description='Please enter your new password.'>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContainer tokenPromise={tokenValidationPromise} token={token} />
      </Suspense>
    </AuthContainer>
  );
};

export default ResetPassword;
