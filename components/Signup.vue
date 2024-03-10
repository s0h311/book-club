<template>
  <form
    class="grid place-items-center gap-4 text-slate-800"
    @submit.prevent="signup"
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

    <div
      v-if="errorMessage"
      class="flex"
    >
      <p class="text-red-400">
        {{ errorMessage }}
      </p>

      <NuxtLink
        class="text-slate-200"
        to="/login"
      >
        &nbsp;Please login</NuxtLink
      >
    </div>

    <button
      class="rounded px-3 py-2 bg-slate-200"
      type="submit"
    >
      Signup
    </button>
  </form>
</template>

<script setup lang="ts">
import validateSignupData from '~/validation/signupData.validation'

const router = useRouter()
const errorMessage = ref<string>('')

async function signup(event: Event) {
  if (!event.target) {
    // TODO handle error
    return
  }

  const formData = new FormData(event.target as HTMLFormElement)

  const email = formData.get('email')
  const password = formData.get('password')

  const validationResult = validateSignupData({ email, password })
  if (!validationResult.success) {
    // TODO handle error
    return
  }

  const { data: userId, error } = await useSignup({
    email: email as string,
    password: password as string,
  })

  if (error) {
    // TODO handle error
    return
  }

  //router.push('/')
}
</script>
