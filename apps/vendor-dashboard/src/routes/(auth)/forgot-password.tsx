import { AuthContainer } from '@/features/auth/components/common/auth-container'
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password')({
  head: () => ({
    meta: [
      {
        title: 'Forgot Password',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthContainer
      title="Forgot Password"
      description="Please enter your email to reset your password."
    >
      <ForgotPasswordForm />
    </AuthContainer>
  )
}
