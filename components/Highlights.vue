<template>
  <div class="space-y-10">
    <h1>{{ book.title }}</h1>

    <h2 class="underline">Highlights</h2>

    <TopicsBar
      :topics="topicsSet"
      @topic-click="filterTopic"
      @reset-topics="resetTopicFilter"
    />

    <ul>
      <li
        v-for="highlight in highlights"
        class="border rounded-md border-slate-800 px-5 py-3 space-y-3"
      >
        <Highlight
          :highlight="highlight"
          :topics="getHighlightTopics(highlight.note)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { get } from '~/server/clients/http.client'
import type { Book } from '~/types/book.type'
import type { Highlight } from '~/types/highlight.type'

type Props = {
  book: Book
}
const props = defineProps<Props>()

const highlights = ref<Highlight[]>(props.book.highlights)

const topicsSet = new Set<string>()

function getHighlightTopics(note: string): string[] {
  const topicsMatch: RegExpMatchArray[] = [...note.matchAll(/(#\w+)/g)]

  const topics: string[] = []

  topicsMatch.forEach((topicMatch) => {
    const topic = topicMatch[1]
    topics.push(topic)
    topicsSet.add(topic)
  })

  return topics
}

function filterTopic(topics: string[]): void {
  if (topics.length === 0) return resetTopicFilter()

  highlights.value = props.book.highlights.filter((highlight) => {
    const currentTopics = getHighlightTopics(highlight.note)
    let res = false
    currentTopics.every((currentTopic) => {
      if (topics.includes(currentTopic)) {
        res = true
        return false // early break
      }
      return true
    })

    return res
  })
}

function resetTopicFilter(): void {
  highlights.value = props.book.highlights
}
</script>
