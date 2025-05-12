import { publicApi } from '@/api/api-client'
import { server } from '@/configs/server'
import { commonValidations } from '@/lib/commonValidation'

import type { ApiResponse } from '@/types/api'
import type { User } from '@/types/user'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const signInSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
})

export type SignInInput = z.infer<typeof signInSchema>

export async function signInWithEmailAndPassWord(data: SignInInput): Promise<
  ApiResponse<{
    accessToken: string
    user: User
  }>
> {
  return publicApi.post(server.path.auth.signIn, data)
}

export function useSignInMutation() {
  return useMutation({
    mutationFn: signInWithEmailAndPassWord,
    onSuccess: async (response) => {
      if (response.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
      }
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
}
