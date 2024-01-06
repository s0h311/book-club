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
      <div class="space-y-10">
        <h1>{{ selectedBook?.title }}</h1>

        <h2 class="underline">Highlights</h2>
        <div
          v-for="highlight in selectedBook?.highlights"
          class="border rounded-md border-slate-800 px-5 py-3 space-y-3"
        >
          <p v-html="highlight.text"></p>

          <p class="text-xs text-slate-600">Page: {{ highlight.page }}</p>

          <ul class="flex gap-2">
            <li
              v-for="tag in getHighlightTags(highlight.note)"
              class="text-xs rounded-md px-1.5 py-0.5 [&:nth-child(odd)]:bg-white [&:nth-child(even)]:bg-red-500 text-black cursor-pointer"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.type'

const router = useRouter()
const selectedBook = useState<Book>('selectedBook')

function getHighlightTags(note: string): string[] {
  const tagsMatch: RegExpMatchArray[] = [...note.matchAll(/(#\w+)/g)]

  const tags: string[] = []

  tagsMatch.forEach((tagMatch) => {
    tags.push(tagMatch[1])
  })

  return tags
}
</script>
