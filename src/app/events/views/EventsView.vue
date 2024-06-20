<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import EventsComponent from '@/app/events/components/EventsComponent.vue'
import { onMounted, ref } from 'vue'
import type { EventModel } from '@/app/events/models/EventModel'
import EventService from '@/app/events/services/EventService'

const label = ref("");
</script>

<template>
  <main>
    <ToolbarComponent :label="label" />
    <EventsComponent :events="events" :loading="loading" />
  </main>
</template>

<style scoped></style>
