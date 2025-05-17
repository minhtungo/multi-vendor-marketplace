import { verifyResetPasswordToken } from '@/features/auth/api/reset-password';
import { AuthContainer } from '@/features/auth/components/common/auth-container';
import { ResetPasswordContainer } from '@/features/auth/components/reset-password-form';
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
        <ResetPasswordContainer tokenPromise={tokenValidationPromise} />
      </Suspense>
    </AuthContainer>
  );
};

export default ResetPassword;
