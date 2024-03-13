import type { User } from '@prisma/client'
import type { SmartUser } from '~/server/types'

export default async function useUser(): Promise<SmartUser> {
  const user = useState<Omit<User, 'hashedPassword'> | null>('user')

  if (user.value) {
    return {
      data: user.value,
      logoutFn: () => (user.value = null),
    }
  }

  const { data, error } = await useFetch('/api/validateSession', {
    method: 'get',
  })

  if (error.value || !data.value) {
    throw new Error(error.value?.message)
  }

  return {
    data: data.value.data,
    logoutFn: () => (user.value = null),
  }
}
