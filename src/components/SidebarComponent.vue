<script setup lang="ts">
import {useSidebarStore} from "@/stores/sidebar";

const store = useSidebarStore();

</script>

<template>
  <div class="sidebar flex flex-column justify-content-between" v-if="store.visible">
    <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
        <span class="inline-flex align-items-center gap-2">
          <span class="font-semibold text-2xl text-primary">Eventra</span>
        </span>
      <p-button type="button" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"/>
    </div>

    <div class="overflow-y-auto flex flex-column">
      <div class="list-none p-3 m-0 overflow-hidden">
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-home mr-2"></i>
          <span class="font-medium">Dashboard</span>
        </a>
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-bookmark mr-2"></i>
          <span class="font-medium">Bookmarks</span>
        </a>
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-users mr-2"></i>
          <span class="font-medium">Team</span>
        </a>
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-comments mr-2"></i>
          <span class="font-medium">Messages</span>
          <span class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle" style="min-width: 1.5rem; height: 1.5rem">3</span>
        </a>
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-calendar mr-2"></i>
          <span class="font-medium">Calendar</span>
        </a>
      </div>

      <div class="list-none p-3 m-0 overflow-hidden">
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-chart-line mr-2"></i>
          <span class="font-medium">Dashboard</span>
        </a>
        <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-cog mr-2"></i>
          <span class="font-medium">Settings</span>
        </a>
      </div>
    </div>

    <div class="mt-auto">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <a class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
        <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"/>
        <span class="font-bold">Amy Elsner</span>
      </a>
    </div>
  </div>

</template>

<style scoped>
.sidebar {
  width: 20rem;
  height: 100vh;
  background-color: var(--surface-card);
}
</style>
