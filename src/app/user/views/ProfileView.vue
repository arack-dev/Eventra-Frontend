<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import ProfileComponent from '@/app/user/components/ProfileComponent.vue'
import { onMounted, ref } from 'vue'
import type { UserModel } from '@/app/user/models/UserModel'
import UserService from '@/app/user/services/UserService'

const label = ref("Profile")
const user = ref<UserModel>()
const loading = ref(true);
const id = ref(1)

onMounted(async () => {
  try {
    const response = await UserService.getId(id.value)
    user.value = response.data
  }
  catch (error) {
    throw new Error("User Service")
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <ToolbarComponent :label="label" />
    <ProfileComponent :user="user" :loading="loading" />
  </main>
</template>

<style scoped>

</style>