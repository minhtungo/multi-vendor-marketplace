import { client } from '@/configs/client'
import { AuthContainer } from '@/features/auth/components/common/auth-container'
import { SignUpForm } from '@/features/auth/components/sign-up-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up')({
  head: () => ({
    meta: [
      {
        title: 'Sign Up',
      },
    ],
  }),
  component: SignUpComponent,
})

function SignUpComponent() {
  return (
    <AuthContainer
      title="Create your account"
      description="Welcome! Please fill in the details to get started."
      footerText="Already have an account?"
      footerLink={client.path.signIn}
      footerLinkText="Sign In"
    >
      <SignUpForm />
    </AuthContainer>
  )
}
