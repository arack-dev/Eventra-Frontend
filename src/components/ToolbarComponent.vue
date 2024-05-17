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
  <p-toolbar>
    <template #start>
      <p-button icon="pi pi-bars" @click="toggleSidebar" />
      <BreadcrumbComponent />
    </template>

    <template #end>
      <p-input-group class="mr-2">
        <p-auto-complete v-model="value" :suggestions="items" @complete="search" />
        <p-button icon="pi pi-search" severity="warning" />
      </p-input-group>
    </template>
  </p-toolbar>
</template>

<style scoped>
</style>