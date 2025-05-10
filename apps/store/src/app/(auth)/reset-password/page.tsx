import { AuthContainer } from '@/features/auth/components/common/auth-container';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

const ResetPassword = () => {
  return (
    <AuthContainer title='Reset Password' description='Please enter your new password.'>
      <ResetPasswordForm />
    </AuthContainer>
  );
};

export default ResetPassword;
