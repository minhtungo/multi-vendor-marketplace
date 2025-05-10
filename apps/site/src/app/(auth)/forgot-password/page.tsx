import { AuthContainer } from '@/components/auth/auth-container';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

const ForgotPassword = () => {
  return (
    <AuthContainer title='Forgot Password' description='Please enter your email to reset your password.'>
      <ForgotPasswordForm />
    </AuthContainer>
  );
};

export default ForgotPassword;
