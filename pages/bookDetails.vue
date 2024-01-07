<template>
  <section class="space-y-5">
    <a
      class="cursor-pointer w-fit"
      @click="router.go(-1)"
    >
      <IconBack />
    </a>

    <article class="lg:flex lg:gap-20 space-y-10 lg:space-y-0 lg:relative">
      <NuxtImg
        class="rounded-md w-1/2 lg:w-[33dvw] xl:w-[20dvw] mx-auto lg:object-contain self-start lg:sticky lg:top-14"
        :src="selectedBook.cover"
        width="50dvw lg:30dvw xl:20dvw"
      />

      <section>
        <h1 class="mb-10">{{ selectedBook.title }}</h1>
        <Highlights
          v-if="selectedBook"
          :book="selectedBook"
        />
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

const router = useRouter()
const selectedBook = useState<Book>('selectedBook')
</script>
