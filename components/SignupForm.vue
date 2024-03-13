<template>
  <form
    class="flex flex-col items-center gap-4 text-slate-800"
    @submit.prevent="($event) => emit('signupClick', $event)"
  >
    <input
      class="rounded px-3 py-2"
      type="text"
      name="email"
      placeholder="E-Mail"
    />
    <input
      class="rounded px-3 py-2"
      type="text"
      name="password"
      placeholder="Password"
    />

    <p
      v-if="errorMessage.message"
      class="text-red-400"
    >
      {{ errorMessage.message }}

      <NuxtLink
        v-if="errorMessage.type === 'emailAlreadyInUse'"
        class="text-slate-200"
        to="/login"
      >
        &nbsp;Please login</NuxtLink
      >
    </p>

    <button
      class="rounded px-3 py-2 bg-slate-200"
      type="submit"
    >
      Signup
    </button>
  </form>
</template>

<script setup lang="ts">
import type { ApiError } from '~/server/types'

type Props = {
  errorMessage: Partial<ApiError>
}

type Emits = {
  signupClick: [event: Event]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
