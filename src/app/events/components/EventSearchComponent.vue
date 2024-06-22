<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CategoryModel } from '@/app/events/models/CategoryModel'
import CategoryService from '@/app/events/services/CategoryService'

const emit = defineEmits(['update-search', 'update-continent']);
const search = ref('');
const op = ref();
const categories = ref<CategoryModel[]>([])

onMounted(async () => {
  try {
    const response = await CategoryService.getAll()
    categories.value = response.data;
  } catch(e) {
    console.log("Error al obtener tdo Category", e)
  }
})

const selectedCategories = ref<string[]>([]);

const onVisible = (event: any) => {
  op.value.toggle(event);
}
const updateContinent = (continent: string) => {
  if (selectedCategories.value.includes(continent)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== continent);
  } else {
    selectedCategories.value.push(continent);
  }
  emit('update-continent', selectedCategories.value);
};
const onInput = () => {
  emit('update-search', search.value);
};
</script>

<template>
  <div class="searchbar flex flex-column">
    <InputGroup>
      <Button class="btn" icon="pi pi-search" severity="warning" rounded/>
      <InputText placeholder="Keyword" @click="onVisible" v-model="search" @input="onInput" />
    </InputGroup>
    <div class="chip-container py-4">
      <Chip v-for="category in categories" :key="category.id" :label="category.name"
            :class="{ 'selected': selectedCategories.includes(category.name) }"
            @click="updateContinent(category.name)" />
    </div>
  </div>
</template>

<style scoped>
.p-chip {
  cursor: pointer;
}

input:focus {
  border-bottom: 2px solid var(--color-main);
  outline: none;
}
input {
  border: none;
  font-size: 1rem;
}

.chip-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.selected {
  background-color: var(--color-skyblue) !important;
  color: white !important;
}

@media screen and (max-width: 768px) {
  input {
    width: 100px;
  }
}
</style>