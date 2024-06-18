<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'

const sidebar = useSidebarStore()
const auth = useAuthStore();
</script>

<template>
  <div class="sidebar flex flex-column justify-content-between gap-2 p-3" v-if="sidebar.visible">
    <div class="flex align-items-center justify-content-between flex-shrink-0">
      <span class="inline-flex align-items-center">
        <Avatar
          image="src/assets/img/logo_eventra.png"
          shape="circle"
          size="xlarge"
          style="width: 6rem; height: auto"
        />
        <span class="font-semibold text-5xl" style="color: var(--color-main)">ventra</span>
      </span>
    </div>

    <div class="overflow-y-auto flex flex-column">
      <router-link
        to="/"
        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
      >
        <i class="pi pi-home mr-2"></i>
        <span class="font-medium">Dashboard</span>
      </router-link>

      <div class="list-none m-0 overflow-hidden" v-if="auth.registered">
        <router-link
          to="/auth/login"
          class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
        >
          <i class="pi pi-bookmark mr-2"></i>
          <span class="font-medium">Bookmarks</span>
        </router-link>
        <router-link
          to="/auth/login"
          class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
        >
          <i class="pi pi-comments mr-2"></i>
          <span class="font-medium">Messages</span>
          <span
            class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle"
            style="min-width: 1.5rem; height: 1.5rem"
            >3</span
          >
        </router-link>
      </div>

      <div class="list-none overflow-hidden" v-if="auth.registered">
        <router-link
          to="/calendar"
          class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
        >
          <i class="pi pi-calendar mr-2"></i>
          <span class="font-medium">Calendar</span>
        </router-link>
        <router-link
          to="/analysis"
          class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
        >
          <i class="pi pi-chart-line mr-2"></i>
          <span class="font-medium">Analysis</span>
        </router-link>
        <router-link
          to="/settings"
          class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
        >
          <i class="pi pi-cog mr-2"></i>
          <span class="font-medium">Settings</span>
        </router-link>
      </div>

      <router-link
        to="/auth/register"
        class="organizer flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
      >
        <span class="font-medium">Organiza con Eventra. Suscribete ahora! -></span>
      </router-link>
    </div>

    <div class="mt-auto" v-if="!auth.registered">
      <h3>Registrar o iniciar sesión</h3>
      <p>
        Descubre eventos culturales, educativos, deportivos, tecnologicos y muchos mas, conecta con
        tu comunidad y enriquece tu vida con experiencias únicas.
      </p>
      <hr class="my-3 mx-3 border-top-1 border-none surface-border" />
      <router-link to="/auth/register">
        <Button class="btn-primary" label="Registrar" style="width: 100%" />
      </router-link>
      <hr class="mb-1 mx-3 border-top-1 border-none surface-border" />
      <router-link to="/auth/login">
        <Button class="btn-outlined" label="Iniciar Sesion" outlined style="width: 100%" />
      </router-link>
    </div>
    <div class="mt-auto" v-if="auth.registered">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <a
        class="flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
      >
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        />
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
  .organizer {
    background: var(--surface-100);
  }
}

.router-link-active {
  background: transparent !important;
  i,
  span {
    color: var(--color-skyblue);
  }
}
@media screen and (max-width: 768px) {
  .sidebar {
    position: fixed;
  }
}
</style>
