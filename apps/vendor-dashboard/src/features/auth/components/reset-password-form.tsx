import { client } from '@/configs/client'
import {
  resetPasswordSchema,
  useResetPasswordMutation,
} from '@/features/auth/api/reset-password'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { FormResponse } from '@repo/ui/components/form-response'
import { LoaderButton } from '@repo/ui/components/loader-button'
import { PasswordInput } from '@repo/ui/components/password-input'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const resetPasswordInputSchema = resetPasswordSchema
  .extend({
    confirm_password: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export function ResetPasswordForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<z.infer<typeof resetPasswordInputSchema>>({
    resolver: zodResolver(resetPasswordInputSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  })

  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useResetPasswordMutation()

  const onSubmit = (data: z.infer<typeof resetPasswordInputSchema>) => {
    resetPassword(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isSuccess && (
          <FormResponse
            title="Success"
            variant="success"
            description="Password reset successfully."
          />
        )}
        {isError && (
          <FormResponse
            title="Error"
            variant="destructive"
            description={
              error?.message || 'An error occurred while resetting password.'
            }
          />
        )}

        <LoaderButton isPending={isPending} className="w-full">
          Reset Password
        </LoaderButton>
        <div className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link
            to={client.path.signIn}
            className="underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  )
}
