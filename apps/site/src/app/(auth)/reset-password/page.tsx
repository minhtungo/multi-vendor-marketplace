import { AuthContainer } from '@/components/auth/auth-container';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

const ResetPassword = () => {
  return (
    <AuthContainer title='Reset Password' description='Please enter your new password.'>
      <ResetPasswordForm />
    </AuthContainer>
  );
};

export default ResetPassword;
