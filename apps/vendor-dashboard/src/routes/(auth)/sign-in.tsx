import { client } from '@/configs/client'
import { AuthContainer } from '@/features/auth/components/common/auth-container'
import { SignInForm } from '@/features/auth/components/sign-in-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-in')({
  head: () => ({
    meta: [
      {
        title: 'Sign In',
      },
    ],
  }),
  component: SignInComponent,
})

function SignInComponent() {
  return (
    <AuthContainer
      title="Sign in to your account"
      description="Welcome back! Please fill in the details to get started."
      footerText="Don't have an account?"
      footerLink={client.path.signUp}
      footerLinkText="Sign Up"
    >
      <SignInForm />
    </AuthContainer>
  )
}
