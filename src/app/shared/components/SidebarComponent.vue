<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import UserService from '@/app/user/services/UserService'
import { ref, onMounted, watch } from 'vue'
import { UserModel } from '@/app/user/models/UserModel'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const user = ref(new UserModel())

const fetchUserData = async () => {
  if (authStore.isLoggedIn) {
    const emailLocal = localStorage.getItem('email')
    try {
      const response = await UserService.getEmail(emailLocal ? emailLocal : sessionStorage.getItem('email'))
      user.value = response.data
    } catch (e) {
      console.error('Error fetching user data:', e)
    }
  }
}

onMounted(() => {
  fetchUserData()
})

watch(() => authStore.isLoggedIn, () => {
  fetchUserData()
})
</script>

<template>
  <div class="sidebar flex flex-column justify-content-between gap-2" :class="{ 'visible': sidebarStore.visible }">
    <div class="flex align-items-center justify-content-between flex-shrink-0">
      <span class="inline-flex align-items-center">
        <Image src="/src/assets/img/logo_eventra.png" alt="Logo Eventra" width="100%" height="auto" />
        <span class="logo-text font-semibold text-5xl" style="color: var(--color-main)">ventra</span>
      </span>
    </div>

    <div class="top overflow-y-auto flex flex-column">
      <router-link to="/" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
        <i class="pi pi-home"></i>
        <span class="link-text font-medium ml-2">Dashboard</span>
      </router-link>

      <router-link to="/post" class="organizer flex align-items-center justify-content-between cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
        <span class="link-text font-medium">Publicar en Eventra</span>
        <i class="pi pi-arrow-right"></i>
      </router-link>
    </div>

    <div class="mt-auto auth-actions" v-if="!authStore.isLoggedIn">
      <div class="text-content">
        <h3>Registrar o iniciar sesión</h3>
        <p>Descubre eventos culturales, educativos, deportivos, tecnologicos y muchos mas, conecta con tu comunidad y enriquece tu vida con experiencias únicas.</p>
        <hr class="my-3 mx-3 border-top-1 border-none surface-border" />
      </div>
      <router-link to="/auth/register">
        <Button class="btn icon-only" icon="pi pi-user-plus" rounded />
        <Button class="btn label-only" label="Registrar" style="width: 100%" />
      </router-link>
      <hr class="mb-1 mx-3 border-top-1 border-none surface-border" />
      <router-link to="/auth/login">
        <Button class="btn-outlined icon-only" icon="pi pi-sign-in" rounded outlined />
        <Button class="btn-outlined label-only" label="Iniciar Sesion" outlined style="width: 100%" />
      </router-link>
    </div>
    <div class="mt-auto" v-if="authStore.isLoggedIn">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <router-link to="/profile" class="flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        <span class="link-text font-bold">{{ user.firstName }} {{ user.lastName }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 20rem;
  height: 100vh;
  background-color: var(--surface-card);
  z-index: 100;
  padding: 1rem;
  border-right: 2px solid var(--surface-100);
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
.icon-only {
  display: none;
}
.label-only {
  display: block;
}
@media (max-width: 1024px) {
  .sidebar {
    width: 5rem;
    padding: .5rem;
    .top {
      align-items: center;
    }
    .pi-home {
      font-size: 2em;
    }
  }
  .logo-text, .link-text, .text-content, .label-only {
    display: none;
  }
  .icon-only {
    display: block;
    margin: 0 auto;
  }
}
</style>
