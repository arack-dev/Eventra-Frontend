<script setup lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'

const { route } = defineProps(['route'])
const store = useSidebarStore()
const toggleSidebar = () => {
  store.toggleSidebar()
}

const value = ref('')
const items = ref([])
const home = ref({ label: 'Eventra', route: '/' })

const routes = ref([
  { label: 'Dashboard', route: '/' },
  { label: `${route}`, route: '/' },
])

const search = (event) => {
  let _items = [...Array(10).keys()]
  items.value = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items
}
</script>

<template>
  <Toolbar class="toolbar">
    <template #start>
      <Breadcrumb class="breadcrumb" :home="home" :model="routes" style="border: none">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-color">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </template>

    <template #end>
      <InputGroup class="mr-3">
        <AutoComplete v-model="value" :suggestions="items" @complete="search" />
        <Button icon="pi pi-search" severity="warning" />
      </InputGroup>
      <Button icon="pi pi-bars" @click="toggleSidebar" style="background: var(--color-main)" />
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar {
  padding: 1.5rem;
  .breadcrumb {
    padding: 0 !important;
  }
}
</style>
