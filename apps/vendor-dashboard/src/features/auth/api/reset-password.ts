import { publicApi } from '@/api/api-client'
import { server } from '@/configs/server'
import { commonValidations } from '@/lib/commonValidation'
import type { ApiResponse } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const resetPasswordSchema = z.object({
  password: commonValidations.password,
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export async function resetPassword(data: ResetPasswordInput): Promise<
  ApiResponse<{
    password: string
  }>
> {
  const resetPasswordData = resetPasswordSchema.parse(data)
  return publicApi.post(server.path.auth.resetPassword, resetPasswordData)
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error(error)
    },
  })
}
