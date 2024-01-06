import type { HighlightResponse } from '~/server/api/highlight.get'
import type { Book } from '~/types/book.type'

export default async function useFetchBooks(): Promise<Book[]> {
  const { data, error } = await useLazyFetch<HighlightResponse>('/api/highlight', {})

  if (error.value || data.value?.error) {
    // TODO handle error
    return []
  }

  return data.value?.data ?? []
}
