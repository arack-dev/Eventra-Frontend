<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import EventSearchComponent from '@/app/events/components/EventSearchComponent.vue'
import { onMounted, ref, computed } from 'vue'
import type { EventModel } from '@/app/events/models/EventModel'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import EventService from '@/app/events/services/EventService'

const layout = ref('grid')
const events = ref<EventModel[]>([])
const loading = ref(true)
const eventImage = ref('https://grandluxormice.com/es/wp-content/uploads/sites/3/2022/07/Evento-corporativo-e1661944165280-1900x1069.jpg')
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const response = await EventService.getAll()
    events.value = response.data
  } catch (error) {
    console.log('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
})

const goToEventDetail = (event: EventModel) => {
  router.push(`/get-ticket/${event.id}`)
}

//search
const search = ref('')
const categories = ref<string[]>([])
const updateSearch = (newSearch: string) => {
  search.value = newSearch
}
const updateCategory = (categoryName: string[]) => {
  categories.value = categoryName
}

const filteredEvents = computed(() => {
  if (!events.value) return []

  return events.value.filter(event => {
    const matchesSearch = search.value !== '' ? event.title.toLowerCase().includes(search.value.toLowerCase()) : true
    const matchesCategory = categories.value.length > 0 ? categories.value.includes(event.categoryEvent.name) : true
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <main>
    <ToolbarComponent label="" />
    <section class="my-events">
      <template v-if="loading">
        <div class="flex justify-content-between gap-2">
          <EventSearchComponent />
          <DataViewLayoutOptions v-model="layout" />
        </div>
        <Divider />
        <div class="grid grid-nogutter">
          <div v-for="index in 8" :key="index" class="col-12 sm:col-6 md:col-6 xl:col-3 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
              <div class="surface-50 flex justify-content-center border-round p-3">
                <Skeleton shape="rectangle" width="100%" height="200px" />
              </div>
              <div class="pt-4">
                <div class="flex flex-row justify-content-between align-items-start gap-2">
                  <div>
                    <Skeleton width="70%" height="1.5rem" />
                    <Skeleton width="50%" height="1.5rem" class="mt-1" />
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <Skeleton width="40px" height="1.5rem" />
                  </div>
                </div>
                <div class="flex flex-column gap-4 mt-4">
                  <div class="flex gap-2">
                    <Skeleton shape="rectangle" width="85%" height="2.2rem" />
                    <Skeleton shape="rectangle" width="15%" height="2.2rem" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <DataView v-else :value="filteredEvents" :layout="layout" paginator :rows="8">
        <template #header>
          <div class="flex justify-content-between gap-4">
            <EventSearchComponent @update-search="updateSearch" @update-continent="updateCategory" />
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>

        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(event, index) in slotProps.items" :key="index" class="col-12">
              <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                <div class="md:w-10rem relative">
                  <img class="block xl:block mx-auto border-round w-full" :src="eventImage" :alt="event.title" />
                </div>
                <div class="flex flex-column md:flex-row justify-content-between md:align-events-center flex-1 gap-4">
                  <div class="flex flex-row md:flex-column justify-content-between align-events-start gap-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">{{ event.categoryEvent.name }}</span>
                      <div class="text-lg font-medium text-900 mt-2">{{ event.title }}</div>
                    </div>
                    <div class="surface-100 p-1" style="border-radius: 30px">
                      <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06);">
                        <span class="text-900 font-medium text-sm">{{ event.id }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column md:align-items-end gap-5">
                    <span class="text-xl font-semibold text-900">{{ event.location }}</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button icon="pi pi-bookmark" outlined v-if="authStore.isLoggedIn"/>
                      <Button class="btn" icon="pi pi-share-alt"/>
                      <Button label="Get Ticket" class="btn flex-auto md:flex-initial white-space-nowrap" @click="goToEventDetail(event)"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(event, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-6 xl:col-3 p-2">
              <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                <div class="surface-50 flex justify-content-center border-round p-3">
                  <div class="relative mx-auto">
                    <Image class="border-round w-full" :src="eventImage" :alt="event.name" width="300" preview style="max-width: 300px" />
                    <Tag :value="event.location" class="absolute" style="left: 4px; top: 4px"></Tag>
                  </div>
                </div>
                <div class="pt-4">
                  <div class="flex flex-row justify-content-between align-items-start gap-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">{{ event.categoryEvent.name }}</span>
                      <div class="text-lg font-medium text-900 mt-2">{{ event.title }}</div>
                    </div>
                    <div class="surface-100 p-1" style="border-radius: 30px">
                      <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06);">
                        <span class="text-900 font-medium text-sm">{{ event.id }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column gap-4 mt-4">
                    <div class="flex gap-2">
                      <Button icon="pi pi-bookmark" outlined v-if="authStore.isLoggedIn"/>
                      <Button class="btn" icon="pi pi-share-alt"/>
                      <Button label="Get Ticket" :disabled="event.inventoryStatus === 'OUTOFSTOCK'" class="btn flex-auto white-space-nowrap" @click="goToEventDetail(event)"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </section>
  </main>
</template>

<style scoped></style>
