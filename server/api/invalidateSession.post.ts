import { lucia } from '../auth/lucia'

export default defineEventHandler(async (event): Promise<void> => {
  const body = await readBody(event)
  const { invalidateAll, userId } = JSON.parse(body ?? '{}')

  const sessionId = getCookie(event, 'auth_session')

  if (!sessionId) {
    console.error('No sessionId found, cannot invalidate session')
    return
  }

  if (!invalidateAll) {
    await lucia.invalidateSession(sessionId)
    return
  }

  await lucia.invalidateUserSessions(userId)
})
