import type { User } from '@prisma/client'
import type { SignupData } from '~/types/user.type'

type SignupResponse =
  | {
      data: User['id']
      error: null
    }
  | {
      data: null
      error: Error
    }

export default async function useSignup(data: SignupData): Promise<SignupResponse> {
  const response = await $fetch('api/signup', {
    method: 'POST',
    body: JSON.stringify({ email: data.email, password: data.password }),
  })

  console.log('response', response.json())

  return { data: 123, error: null }
}
