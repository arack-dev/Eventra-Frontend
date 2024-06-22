<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import CreateEventComponent from '@/app/events/components/CreateEventComponent.vue'
import CreateTicketComponent from '@/app/ticket/components/CreateTicketComponent.vue'
import FileUploadComponent from '@/app/shared/components/FileUploadComponent.vue'
import { onMounted, ref } from 'vue'
import { UserModel } from '@/app/user/models/UserModel'
import UserService from '@/app/user/services/UserService'
import type { EventRequestModel } from '@/app/events/models/EventRequestModel'
import EventService from '@/app/events/services/EventService'

const user = ref(new UserModel())

onMounted(async () => {
  try {
    const response = await UserService.getEmail(localStorage.getItem('email'))
    user.value = response.data
  } catch (e) {
    console.error('Error al obtener un Usuario:', e)
  }
})

const eventRequest = ref<EventRequestModel>({
  title: 'Title',
  description: 'description',
  startDate: '2024-06-01 18:00:00',
  endDate: '2024-06-01 22:00:00',
  location: 'location',
  organizerId: 6,
  categoryId: 2,
  url: ''
})
const saveEvent = async () => {
  console.log('saveEvent', eventRequest.value)
  try {
    eventRequest.value.organizerId = user.value.userId
    console.error('eventRequest.value.organizerId:', eventRequest.value.organizerId)
    await EventService.create(eventRequest.value)
  } catch (error) {
    console.error('Error al crear un Evento:', error)
  }
}

const publish = async () => {

}
</script>

<template>
  <main>
    <ToolbarComponent label="Publicar Evento" />
    <section class="create-ticket">
      <div class="container">
        <div class="create__content content">
          <CreateEventComponent :user="user" :eventRequest="eventRequest" @submit.prevent="saveEvent" />
          <div class="box-2 box">
            <CreateTicketComponent />
            <FileUploadComponent class="bg-filter" />
          </div>
        </div>
        <div class="create__footer footer justify-content-end">
          <Button class="btn" label="Publicar" type="submit" @click="publish" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.create-ticket {
  .container {
    .create__content {
      .box-1 {
        width: min(30rem, 100%);
      }
      .box-2 {
        width: min(30rem, 100%);
        display: flex;
        flex-direction: column;
        gap: var(--space-pg);
      }
    }
  }
}
</style>