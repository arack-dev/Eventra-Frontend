<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TicketRequestModel } from '@/app/ticket/models/TicketRequestModel'

const ticketRequest = ref<TicketRequestModel>({
  eventID: 0,
  price: 0,
  totalAvailable: 0,
  category: '',
  description: '',
})

const saveTicket = async () => {

}

</script>

<template>
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

