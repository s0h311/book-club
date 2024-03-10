<template>
  <p
    class="font-sans font-light italic"
    v-html="highlight.text"
  ></p>

  <p class="text-xs text-slate-600">Page: {{ highlight.page }}</p>

  <ul class="flex gap-2">
    <li
      v-for="topic in topics"
      class="text-xs rounded-md px-1.5 py-0.5 [&:nth-child(odd)]:bg-white [&:nth-child(even)]:bg-red-500 text-black cursor-pointer"
      @click="emit('topicClick', topic)"
    >
      {{ topic }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Highlight } from '~/types/highlight.type'

type Props = {
  highlight: Highlight
  topics: string[]
}

type Emits = {
  topicClick: [topic: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
