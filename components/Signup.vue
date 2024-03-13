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
import type { User } from '@prisma/client'
import type { ApiError } from '~/server/types'
import validateSignupData from '~/validation/signupData.validation'

const router = useRouter()
const errorMessage = reactive<Partial<ApiError>>({
  message: '',
  type: undefined,
})

async function signup(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)

  const email = formData.get('email')
  const password = formData.get('password')

  const validationResult = validateSignupData({ email, password })
  if (!validationResult.success) {
    errorMessage.message = validationResult.error.issues[0].message
    return
  }

  const { data: user, error } = await useSignup({
    email: email as string,
    password: password as string,
  })

  if (error) {
    errorMessage.message = error.message
    errorMessage.type = error.type
    return
  }

  useState<Omit<User, 'hashedPassword'>>('user', () => user)

  router.push('/')
}
</script>
