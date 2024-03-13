import { User } from '@prisma/client'
import { lucia } from './lucia'

export default async function updateSession(userId: User['id'], event: any): Promise<void> {
  const session = await lucia.createSession(userId, {})

  const sessionCookie = lucia.createSessionCookie(session.id)

  setCookie(event, sessionCookie.name, sessionCookie.value)
}
