<template>
  <main class="grid">
    <Library
      :books="books"
      @book-click="handleBookClick"
    />
  </main>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

definePageMeta({
  middleware: ['auth'],
})

const books = await useFetchBooks()
const selectedBook = useState<Book>('selectedBook')

async function handleBookClick(asin: string): Promise<void> {
  const book = books.find((book) => book.asin === asin)

  if (!book) {
    // TODO handle error
    return
  }

  selectedBook.value = book
  await navigateTo('/bookDetails')
}
</script>
