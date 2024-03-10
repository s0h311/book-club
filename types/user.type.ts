import { z } from 'zod'

export const zSingupData = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(40),
})

export type SignupData = z.infer<typeof zSingupData>
