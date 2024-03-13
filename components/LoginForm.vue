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
        v-if="numberOfTries >= 3"
        class="text-slate-200"
        to="/login"
      >
        &nbsp;Reset Password</NuxtLink
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
  loginClick: [event: Event]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const numberOfTries = ref<number>(0)

function handleSubmit(event: Event): void {
  emit('loginClick', event)
  numberOfTries.value++
}
</script>
