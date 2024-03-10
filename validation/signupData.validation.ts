import type { SafeParseReturnType } from 'zod'
import { zSingupData } from '~/types/user.type'

type SignupDataValidationResponse = SafeParseReturnType<
  {
    email: string
    password: string
  },
  {
    email: string
    password: string
  }
>

export default function validateSignupData(data: unknown): SignupDataValidationResponse {
  return zSingupData.safeParse(data)
}
