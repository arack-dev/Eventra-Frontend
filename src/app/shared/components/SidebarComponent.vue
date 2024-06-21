<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import UserService from '@/app/user/services/UserService'
import { ref, onMounted, watch } from 'vue'
import { UserModel } from '@/app/user/models/UserModel'
//import { useUserStore } from '@/stores/user'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
//const userStore = useUserStore()
const user = ref(new UserModel())

const fetchUserData = async () => {
  if (authStore.isLoggedIn) {
    try {
      console.error('Email:', authStore.email)
      const response = await UserService.getEmail(authStore.email)
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
  <div class="sidebar flex flex-column justify-content-between gap-2 p-3" :class="{ 'visible': sidebarStore.visible }">
    <div class="flex align-items-center justify-content-between flex-shrink-0">
      <span class="inline-flex align-items-center">
        <Image
          src="/src/assets/img/logo_eventra.png"
          alt="Logo Eventra"
          width="100px" height="auto"
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

      <router-link
        to="/auth/register"
        class="organizer flex align-items-center justify-content-between cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
      >
        <span class="font-medium">Publicar Evento</span>
        <i class="pi pi-arrow-right"></i>
      </router-link>
    </div>

    <div class="mt-auto" v-if="!authStore.isLoggedIn">
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
    <div class="mt-auto" v-if="authStore.isLoggedIn">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <router-link
        to="/profile"
        class="flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
      >
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        />
        <span class="font-bold">{{ user.firstName }} {{ user.lastName }}</span>
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
@media (max-width: 868px) {
  .sidebar {
    position: fixed;
  }
  .sidebar.visible {
    display: none !important;
  }
}
</style>
