<script setup lang="ts">
import { ref } from 'vue';
import {useSidebarStore} from "@/stores/sidebar";
import BreadcrumbComponent from "@/components/toolbar/BreadcrumbComponent.vue";

const store = useSidebarStore();

const toggleSidebar = () => {
  store.toggleSidebar();
};

const value = ref("");
const items = ref([]);

const search = (event) => {
  let _items = [...Array(10).keys()];

  items.value = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
}
</script>

<template>
  <Toolbar>
    <template #start>
      <Button icon="pi pi-bars" @click="toggleSidebar" style="background: var(--color-main);" />
      <BreadcrumbComponent />
    </template>

    <template #end>
      <InputGroup class="mr-2">
        <AutoComplete v-model="value" :suggestions="items" @complete="search" />
        <Button icon="pi pi-search" severity="warning" />
      </InputGroup>
    </template>
  </Toolbar>
</template>

<style scoped>
</style>