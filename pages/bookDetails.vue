<template>
  <section class="space-y-10">
    <a
      class="cursor-pointer w-fit"
      @click="router.go(-1)"
    >
      <IconBack />
    </a>

    <article class="lg:flex lg:gap-10">
      <NuxtImg
        class="rounded-md object-contain self-start"
        :src="selectedBook.cover"
        width="18dvw"
      />

      <Highlights
        v-if="selectedBook"
        :book="selectedBook"
      />
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

const router = useRouter()
const selectedBook = useState<Book>('selectedBook')
</script>
