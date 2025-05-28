import { AuthContainer } from '@/features/auth/components/common/auth-container';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { clientPaths } from '@/configs/paths';

const SignIn = () => {
  return (
    <AuthContainer
      title='Sign in to your account'
      description='Welcome back! Please fill in the details to get started.'
      footerText="Don't have an account?"
      footerLink={clientPaths.auth.signUp}
      footerLinkText='Sign Up'
    >
      <SignInForm />
    </AuthContainer>
  );
};

export default SignIn;
