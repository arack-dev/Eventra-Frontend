<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarComponent from '@/app/shared/components/SidebarComponent.vue'
import { onMounted } from 'vue';

onMounted(() => {
  // Limpiar localStorage y sessionStorage cuando la aplicación se monte
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('password');
});
</script>

<template>
  <div id="container-app">
    <SidebarComponent />
    <RouterView />
  </div>
</template>

<style scoped>
#container-app {
  display: flex;
}
</style>
