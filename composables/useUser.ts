import type { User } from '@prisma/client'

export default async function useUser(): Promise<Omit<User, 'hashedPassword'>> {
  const user = useState<Omit<User, 'hashedPassword'>>('user')

  if (user.value) {
    return user.value
  }

  const { data, error } = await useFetch('/api/validateSession')

  if (error.value || !data.value?.data) {
    throw new Error(error.value?.message)
  }

  return data.value.data
}
