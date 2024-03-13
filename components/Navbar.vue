<template>
  <nav class="flex justify-between">
    <Logo />

    <button
      v-if="user.data"
      @click="handleLogout"
    >
      Logout
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { SmartUser } from '~/server/types'

const user: SmartUser | null = await useUser()

async function handleLogout(): Promise<void> {
  if (!user?.data) {
    return
  }

  await $fetch('/api/invalidateSession', { method: 'post' })
  user.logoutFn()
  await navigateTo('/login')
}
</script>
