<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CategoryModel } from '@/app/events/models/CategoryModel'
import FileUploadComponent from '@/app/shared/components/FileUploadComponent.vue'
import { UserModel } from '@/app/user/models/UserModel'
import EventService from '@/app/events/services/EventService'
import type { EventRequestModel } from '@/app/events/models/EventRequestModel'
import UserService from '@/app/user/services/UserService'
import type { TicketRequestModel } from '@/app/ticket/models/TicketRequestModel'

const user = ref(new UserModel())

const eventRequest = ref<EventRequestModel>({
  title: 'Title',
  description: 'description',
  startDate: '2024-06-01 18:00:00',
  endDate: '2024-06-01 22:00:00',
  location: 'location',
  organizerId: 6,
  categoryId: 2,
})
const ticketRequest = ref<TicketRequestModel>({
  eventID: 0,
  price: 0,
  totalAvailable: 0,
  category: '',
  description: '',
})

const categories = ref<CategoryModel[]>([
  { id: 1, name: 'Music' },
  { id: 2, name: 'Sports' },
  { id: 3, name: 'Education' },
  { id: 4, name: 'Technology' }
])

const router = useRouter()

onMounted(async () => {

  try {
    const response = await UserService.getEmail(localStorage.getItem('email'))
    user.value = response.data
  } catch (e) {
    console.error('Error al obtener un Usuario:', e)
  }
})

const saveTicket = async () => {
  console.log('Saving', eventRequest.value)

  try {
    eventRequest.value.organizerId = user.value.userId
    console.error('eventRequest.value.organizerId:', eventRequest.value.organizerId)
    await EventService.create(eventRequest.value)
  } catch (error) {
    console.error('Error al crear un Evento:', error)
  }
}
</script>

<template>
  <section class="create-ticket">
    <div class="container">
      <div class="create__content content">
        <form class="box-1 box bg-filter" @submit.prevent="saveTicket">
          <div class="item__header header pb-3">
            <h1>Crear Evento</h1>
            <Button class="btn" icon="pi pi-save" type="submit" rounded @click="saveTicket" />
          </div>
          <div class="form-group">
            <label for="title">Event Title:</label>
            <InputText class="w-full" id="title" v-model="eventRequest.title" />
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <Dropdown class="w-full" id="category" v-model="eventRequest.categoryId" :options="categories" optionLabel="name" optionValue="id" />
          </div>
          <div class="form-group">
            <label for="description">Event Description:</label>
            <Textarea class="w-full" id="description" v-model="eventRequest.description" rows="3" />
          </div>
          <div class="form-group">
            <label for="location">Location:</label>
            <InputText class="w-full" id="location" v-model="eventRequest.location" />
          </div>
          <div class="form-group">
            <label for="startDate">Start Date:</label>
            <Calendar class="w-full" v-model="eventRequest.startDate" showIcon showTime iconDisplay="input" dateFormat="yy-mm-dd" />
          </div>
          <div class="form-group">
            <label for="endDate">End Date:</label>
            <Calendar class="w-full" v-model="eventRequest.endDate" showIcon showTime iconDisplay="input" dateFormat="yy-mm-dd" />
          </div>
          <div class="form-group">
            <label for="image">Event Image URL:</label>
            <InputText class="w-full" id="image" v-model="ticketRequest.category" />
          </div>
        </form>

        <div class="box-2 box">
          <form class="bg-filter" @submit.prevent="saveTicket">
            <div class="item__header header pb-3">
              <h1>Crear Ticket</h1>
              <Button class="btn" icon="pi pi-save" type="submit" rounded @click="saveTicket" />
            </div>
            <div class="form-group">
              <label for="price">Price:</label>
              <InputText class="w-full" id="price" v-model="ticketRequest.price" type="number" />
            </div>
            <div class="form-group">
              <label for="totalAvailable">Total Available Tickets:</label>
              <InputText class="w-full" id="totalAvailable" v-model="ticketRequest.totalAvailable" type="number" />
            </div>
            <div class="form-group">
              <label for="ticketDescription">Ticket Description:</label>
              <Textarea class="w-full pb-0" id="ticketDescription" v-model="ticketRequest.description" rows="3" />
            </div>
          </form>
          <FileUploadComponent class="bg-filter" />
        </div>
      </div>
      <div class="create__footer footer justify-content-end">
        <Button class="btn" label="Publicar" type="submit" @click="saveTicket" />
      </div>
    </div>
  </section>
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

.form-group {
  margin-top: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: var(--color-main)
  }
}
</style>