import { AuthContainer } from '@/modules/auth/components/common/auth-container';
import { ForgotPasswordForm } from '@/modules/auth/components/forgot-password-form';

const ForgotPassword = () => {
  return (
    <AuthContainer title='Forgot Password' description='Please enter your email to reset your password.'>
      <ForgotPasswordForm />
    </AuthContainer>
  );
};

export default ForgotPassword;
