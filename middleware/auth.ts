import type { SmartUser } from '~/server/types'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user: SmartUser | null = await useUser()

  if (user.data) {
    return
  }

  return navigateTo('/login')
})
