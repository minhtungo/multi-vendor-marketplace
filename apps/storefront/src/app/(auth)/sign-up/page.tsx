import { AuthContainer } from '@/features/auth/components/common/auth-container';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { clientPaths } from '@/configs/paths';

const SignUp = () => {
  return (
    <AuthContainer
      title='Create your account'
      description='Welcome! Please fill in the details to get started.'
      footerText='Already have an account?'
      footerLink={clientPaths.auth.signIn}
      footerLinkText='Sign In'
    >
      <SignUpForm />
    </AuthContainer>
  );
};

export default SignUp;
