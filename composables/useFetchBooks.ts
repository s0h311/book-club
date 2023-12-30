import type { RefSymbol } from '@vue/reactivity'
import type { Book } from '~/server/types/book.type'

export default async function useFetchBooks(): Promise<Book[]> {
  const { data, error } = await useFetch<Book[]>('/api/highlight')

  if (error.value || data.value.error) {
    // TODO handle error
    return []
  }

  return data.value.data ?? []
}
