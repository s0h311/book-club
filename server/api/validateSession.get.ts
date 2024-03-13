import { lucia } from '../auth/lucia'
import { User } from '@prisma/client'
import { ApiResponse } from '../types'
import updateSession from '../auth/updateSession'

export default defineEventHandler(async (event): Promise<ApiResponse<Omit<User, 'hashedPassword'> | null>> => {
  const sessionId = getCookie(event, 'auth_session')

  if (!sessionId) {
    return {
      data: null,
      error: null,
    }
  }

  const { session, user } = await lucia.validateSession(sessionId)

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
