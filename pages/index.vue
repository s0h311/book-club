<template>
  <div v-for="book in books">
    <h2>{{ book.title }}</h2>
    <div>
      <div v-for="highlight in book.highlights">
        <p>{{ highlight.text }}</p>
        <p>{{ highlight.page }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from '~/server/types/book.type'

const books = await useFetchBooks()
</script>
