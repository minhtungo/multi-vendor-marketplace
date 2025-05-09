import { AuthContainer } from '@/components/auth/auth-container';
import { SignInForm } from '@/components/auth/sign-in-form';
import { client } from '@/configs/client';

const SignIn = () => {
  return (
    <AuthContainer
      title='Sign in to your account'
      description='Welcome back! Please fill in the details to get started.'
      footerText="Don't have an account?"
      footerLink={client.path.signUp}
      footerLinkText='Sign Up'
    >
      <SignInForm />
    </AuthContainer>
  );
};

export default SignIn;
