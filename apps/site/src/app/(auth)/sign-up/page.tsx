import { AuthContainer } from '@/components/auth/auth-container';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { client } from '@/configs/client';

const SignUp = () => {
  return (
    <AuthContainer
      title='Create your account'
      description='Welcome! Please fill in the details to get started.'
      footerText='Already have an account?'
      footerLink={client.path.signIn}
      footerLinkText='Sign In'
    >
      <SignUpForm />
    </AuthContainer>
  );
};

export default SignUp;
