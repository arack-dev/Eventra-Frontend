<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import EventDetailComponent from '@/app/events/components/EventDetailComponent.vue'
import { onMounted, ref } from 'vue'
import router from '@/router'
import EventService from '@/app/events/services/EventService'
import { EventModel } from '@/app/events/models/EventModel'

const label = ref('Event Detail')
</script>

<template>
  <main>
    <ToolbarComponent :label="label" />
    <EventDetailComponent />
  </main>
</template>

<style scoped>

</style>