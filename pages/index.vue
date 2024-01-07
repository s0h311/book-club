<template>
  <div class="space-y-10">
    <Logo />
    <Library
      :books="books"
      @book-click="handleBookClick"
    />
  </div>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

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
