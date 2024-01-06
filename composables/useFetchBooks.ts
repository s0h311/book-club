import type { HighlightResponse } from '~/server/api/highlight.get'
import type { Book } from '~/server/types/book.type'

export default async function useFetchBooks(): Promise<Book[]> {
  const { data, error } = await useFetch<HighlightResponse>('/api/highlight')

  if (error.value || data.value?.error) {
    // TODO handle error
    return []
  }

  return data.value?.data ?? []
}
