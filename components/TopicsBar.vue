<template>
  <div>
    <h2 class="mb-3">Topics</h2>
    <ul class="flex gap-3 items-center overflow-x-auto lg:flex-wrap hide-scrollbar">
      <li
        v-for="topic in topics"
        :key="topic"
        class="text-xs rounded-md px-1.5 py-0.5 text-black cursor-pointer"
        :class="filteredTopics.includes(topic) ? 'bg-slate-100' : 'bg-slate-400'"
        @click="handleTopicClick(topic)"
      >
        {{ topic }}
      </li>
      <li
        v-if="filteredTopics.length > 0"
        class="text-xs text-white cursor-pointer"
        @click="handleResetTopics"
      >
        <IconX />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Props = {
  topics: Set<string>
}

type Emits = {
  topicClick: [topics: string[]]
  resetTopics: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const filteredTopics = ref<string[]>([])

function handleTopicClick(topic: string): void {
  if (filteredTopics.value.includes(topic)) {
    filteredTopics.value = filteredTopics.value.filter((currentTopic) => currentTopic !== topic)
  } else {
    filteredTopics.value.push(topic)
  }

  emit('topicClick', filteredTopics.value)
}

function handleResetTopics(): void {
  filteredTopics.value = []
  emit('resetTopics')
}
</script>
