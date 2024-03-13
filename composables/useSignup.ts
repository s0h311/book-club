import type { User } from '@prisma/client'
import type { ApiResponse } from '~/server/types'
import type { SignupData } from '~/types/user.type'

export default async function useSignup(data: SignupData): Promise<ApiResponse<Omit<User, 'hashedPassword'>>> {
  const response = await $fetch('api/signup', {
    method: 'POST',
    body: JSON.stringify({ email: data.email, password: data.password }),
  })

  return response as ApiResponse<Omit<User, 'hashedPassword'>>
}
