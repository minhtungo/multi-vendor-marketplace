import { client } from '@/configs/client'
import { AuthContainer } from '@/features/auth/components/common/auth-container'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/(auth)/reset-password')({
  head: () => ({
    meta: [
      {
        title: 'Reset Password',
      },
    ],
  }),
  component: RouteComponent,
  validateSearch: z.object({
    token: z.union([z.string(), z.number()]).transform((val) => String(val)),
  }),
  beforeLoad: async ({ search }) => {
    const { token } = search

    if (!token) {
      throw redirect({ to: client.path.signIn })
    }
  },
})

function RouteComponent() {
  return (
    <AuthContainer
      title="Reset Password"
      description="Please enter your new password."
    >
      <ResetPasswordForm />
    </AuthContainer>
  )
}
