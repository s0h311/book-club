<template>
  <section>
    <h1>Login</h1>

    <LoginForm
      :error-message="errorMessage"
      @login-click="login"
    />
  </section>
</template>

<script setup lang="ts">
import type { User } from 'lucia'
import type { ApiError } from '~/server/types'
import validateSignupData from '~/validation/signupData.validation'

definePageMeta({
  middleware: ['not-auth'],
})

const errorMessage = reactive<Partial<ApiError>>({
  message: '',
  type: undefined,
})

async function login(event: Event) {
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

  navigateTo('/')
}
</script>
