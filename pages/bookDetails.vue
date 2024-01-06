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
        class="rounded-md"
        :src="selectedBook.cover"
        width="18dvw"
      />
      <div class="space-y-4">
        <h1>{{ selectedBook?.title }}</h1>

        <h2 class="underline">Highlights</h2>
        <div v-for="highlight in selectedBook?.highlights">
          <p v-html="highlight.text"></p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

const router = useRouter()

const selectedBook = useState<Book>('selectedBook')
</script>
