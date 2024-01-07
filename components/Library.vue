<template>
  <section class="flex gap-5 md:gap-8">
    <summary
      v-for="book in books"
      class="list-none cursor-pointer"
      @click="emit('bookClick', book.asin)"
    >
      <NuxtImg
        class="rounded-sm"
        :src="book.cover"
        sizes="40dvw sm:25dvw md:20dvw lg:12dvw"
      />
    </summary>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

type Props = {
  books: Book[]
}

type Emits = {
  bookClick: [asin: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
