import { lucia } from '../auth/lucia'
import { User } from '@prisma/client'
import { ApiResponse } from '../types'
import updateSession from '../auth/updateSession'

export default defineEventHandler(async (event): Promise<ApiResponse<Omit<User, 'hashedPassword'>>> => {
  const body: { sessionId: string } = await readBody(event)

  const { session, user } = await lucia.validateSession(body.sessionId)

  if (session?.fresh) {
    updateSession(user.id, event)
  }

  if (!user) {
    return {
      data: null,
      error: {
        message: 'No user found',
        type: 'unknown',
      },
    }
  }

  return {
    data: user,
    error: null,
  }
})
