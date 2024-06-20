<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import EventDetailComponent from '@/app/events/components/EventDetailComponent.vue'
import { onMounted, ref } from 'vue'
import router from '@/router'
import EventService from '@/app/events/services/EventService'
import { EventModel } from '@/app/events/models/EventModel'

const label = ref('Event Detail')
const id = ref(0)
const event = ref(new EventModel())
const loading = ref(true)

onMounted(async () => {
  const parts = router.currentRoute.value.path.split('/')
  id.value = Number(parts[parts.length - 1])

  try {
    const response = await EventService.getId(id.value)
    console.log(response.data)
    event.value = response.data
    console.log(event.value)
  } catch (error) {
    throw new Error('PIPIPI')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <ToolbarComponent :label="label" />
    <EventDetailComponent :event="event" :loading="loading" />
  </main>
</template>

<style scoped>

</style>