<script setup lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'

const { label } = defineProps(['label'])
const store = useSidebarStore()
const toggleSidebar = () => {
  store.toggleSidebar()
}

const home = ref({ icon: 'pi pi-home', route: '/' })

const routes = ref([
  { label: `${label}`, route: '' },
])

</script>

<template>
  <Toolbar class="toolbar">
    <template #start>
      <Breadcrumb class="breadcrumb" :home="home" :model="routes" style="border: none">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span class="icon" :class="[item.icon, 'text-color']" />
              <span class="font">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-color">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </template>

    <template #end>
      <div class="flex gap-2">
        <Button class="btn-orange" icon="pi pi-bell" severity="warning" rounded aria-label="Notification" />
        <Button class="btn-orange" icon="pi pi-cog" severity="warning" rounded aria-label="Notification" />
        <Button class="btn-sidebar btn" icon="pi pi-bars" @click="toggleSidebar" aria-label="Sidebar Button" />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar {
  padding: 1rem;
  a .icon {
    font-size: 2em;
  }
  .breadcrumb {
    padding: 0 !important;
  }
  .btn-sidebar {
    display: none;
  }
}
@media screen and (max-width: 868px) {
  .toolbar {
    .btn-sidebar {
      display: initial;
    }
  }
}
</style>
