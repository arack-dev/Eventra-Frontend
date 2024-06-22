<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CategoryModel } from '@/app/events/models/CategoryModel'
import CategoryService from '@/app/events/services/CategoryService'

const { eventRequest } = defineProps([ 'eventRequest' ])
const categories = ref<CategoryModel[]>([])

onMounted(async () => {
  try {
    const response = await CategoryService.getAll()
    categories.value = response.data;
  } catch(e) {
    console.log("Error al obtener tdo Category", e)
  }
})

</script>

<template>
  <form class="box-1 box bg-filter">
    <div class="item__header header pb-3">
      <h1>Crear Evento</h1>
      <Button class="btn" icon="pi pi-save" type="submit" rounded />
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
      <InputText class="w-full" id="image" v-model="eventRequest.url" />
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