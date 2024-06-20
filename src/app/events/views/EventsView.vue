<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import EventsComponent from '@/app/events/components/EventsComponent.vue'
import { onMounted, ref } from 'vue'
import type { EventModel } from '@/app/events/models/EventModel'
import EventService from '@/app/events/services/EventService'

const label = ref("");
const events = ref<EventModel[]>([])
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await EventService.getAll()
    events.value = response.data
  } catch (error) {
    console.log('Failed to fetch events:', error)
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <main>
    <ToolbarComponent :label="label" />
    <EventsComponent :events="events" :loading="loading" />
  </main>
</template>

<style scoped></style>
