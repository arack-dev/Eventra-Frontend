<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarComponent from "@/components/SidebarComponent.vue";
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
