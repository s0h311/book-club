import type { HighlightResponse } from '~/server/api/highlight.get'
import type { Book } from '~/types/book.type'

export default async function useFetchBooks(): Promise<Book[]> {
  const nuxtApp = useNuxtApp()

  const { data, error } = await useLazyFetch<HighlightResponse>('/api/highlight', {
    getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  })

  if (error.value || data.value?.error) {
    // TODO handle error
    return []
  }

  return data.value?.data ?? []
}
