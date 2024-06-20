<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import ProfileComponent from '@/app/user/components/ProfileComponent.vue'
import { ref } from 'vue'

const label = ref('Profile')

</script>

<template>
  <main>
    <ToolbarComponent :label="label" />
    <ProfileComponent />
  </main>
</template>