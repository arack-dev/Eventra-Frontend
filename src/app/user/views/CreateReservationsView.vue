<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TicketRequestModel } from '@/app/ticket/models/TicketRequestModel'
import type { EventModel } from '@/app/events/models/EventModel'
import EventService from '@/app/events/services/EventService'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

const authStore = useAuthStore()
const toast = useToast()

const ticketRequest = ref<TicketRequestModel>({
  eventID: 0,
  price: 0,
  totalAvailable: 0,
  category: '',
  description: '',
})

const events = ref<EventModel[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const email = localStorage.getItem('email')
    if (email) {
      const userResponse = await EventService.getUserByEmail(email)
      const userId = userResponse.data.userId

      if (userId) {
        const response = await EventService.getEventsByUserId(String(userId))
        events.value = response.data
      }
    }
  } catch (error) {
    console.log('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
})

const saveTicket = async () => {
  try {
    await axios.post('${API_BASE_URL}/tickets', ticketRequest.value)
    toast.add({ severity: 'success', summary: 'Success', detail: 'Your ticket has been created!', life: 3000 })
  } catch (error) {
    console.error('Failed to save ticket:', error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create ticket.', life: 3000 })
  }
}
</script>

<template>
  <form class="bg-filter" @submit.prevent="saveTicket">
    <div class="item__header header pb-3">
      <h1>Crear Ticket</h1>
      <Button class="btn" icon="pi pi-save" type="submit" rounded />
    </div>
    <div class="form-group">
      <label for="eventID">Event:</label>
      <Dropdown id="eventID" v-model="ticketRequest.eventID" :options="events" optionLabel="title" optionValue="id" class="w-full" :disabled="loading" />
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
      <label for="category">Category:</label>
      <InputText class="w-full" id="category" v-model="ticketRequest.category" type="text" />
    </div>
    <div class="form-group">
      <label for="ticketDescription">Ticket Description:</label>
      <Textarea class="w-full pb-0" id="ticketDescription" v-model="ticketRequest.description" rows="3" />
    </div>
  </form>
  <Toast />
</template>

<style scoped>
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
