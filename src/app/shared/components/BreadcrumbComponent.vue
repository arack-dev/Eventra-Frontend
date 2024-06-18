<script setup lang="ts">
import { ref } from 'vue'

const home = ref({
  label: 'Eventra',
  route: '/'
})
const items = ref([{ label: 'Dashboard', route: '/' }])
</script>

<template>
  <Breadcrumb :home="home" :model="items" style="border: none">
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

<style scoped></style>
