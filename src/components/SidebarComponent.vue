<script setup lang="ts">
import {useSidebarStore} from "@/stores/sidebar";

const store = useSidebarStore();

</script>

<template>
  <div class="sidebar flex flex-column justify-content-between gap-2 p-3" v-if="store.visible">
    <div class="flex align-items-center justify-content-between flex-shrink-0">
        <span class="inline-flex align-items-center">
          <Avatar image="src/assets/logo_eventra.png" shape="circle" size="xlarge" style="width: 6rem; height: auto;" />
          <span class="font-semibold text-5xl " style="color: var(--color-main);">ventra</span>
        </span>
    </div>

    <div class="overflow-y-auto flex flex-column">
      <div class="list-none m-0 overflow-hidden">
        <router-link to="/" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-home mr-2"></i>
          <span class="font-medium">Dashboard</span>
        </router-link>
        <router-link to="/auth/login" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-bookmark mr-2"></i>
          <span class="font-medium">Bookmarks</span>
        </router-link>
        <router-link to="/auth/login" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-comments mr-2"></i>
          <span class="font-medium">Messages</span>
          <span class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle" style="min-width: 1.5rem; height: 1.5rem">3</span>
        </router-link>
        <router-link to="/auth/login" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-calendar mr-2"></i>
          <span class="font-medium">Calendar</span>
        </router-link>
      </div>

      <div class="list-none overflow-hidden">
        <router-link to="/auth/login" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-chart-line mr-2"></i>
          <span class="font-medium">Dashboard</span>
        </router-link>
        <router-link to="/auth/login" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-cog mr-2"></i>
          <span class="font-medium">Settings</span>
        </router-link>
      </div>
    </div>

    <div class="mt-auto">
      <h3>Suscribirse o iniciar sesión</h3>
      <p>Consigue respuestas más inteligentes, carga archivos e imágenes y mucho más.</p>
      <hr class="my-3 mx-3 border-top-1 border-none surface-border" />
      <router-link to="/auth/register">
        <Button class="btn-primary" label="Suscribete" style="width: 100%;" />
      </router-link>
      <hr class="mb-1 mx-3 border-top-1 border-none surface-border" />
      <router-link to="/auth/login">
        <Button class="btn-outlined" label="Iniciar Sesion" outlined style="width: 100%;" />
      </router-link>
    </div>
    <div class="mt-auto" v-if="false">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <a class="flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"/>
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
  z-index: 100;
}

.router-link-active {
  i, span {
    color: var(--color-skyblue);
  }
}
@media screen and (max-width: 768px) {
  .sidebar {
    position: fixed;
  }
}
</style>
