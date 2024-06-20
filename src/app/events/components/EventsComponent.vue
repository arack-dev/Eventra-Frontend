<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const { events, loading } = defineProps(['events', 'loading']);
const layout = ref('grid')

const getSeverity = (product: any) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}

const goToEventDetail = (event: any) => {
  router.push('event-detail/' + event.id);
}
//search
const value = ref('')
const items = ref([])
const search = (event: any) => {
  let _items = [...Array(10).keys()]
  items.value = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items
}
</script>

<template>
  <section class="my-events">
    <template v-if="loading">
      <div class="flex justify-content-between">
        <InputGroup class="search w-30rem">
          <AutoComplete v-model="value" :suggestions="items" @complete="search" />
          <Button icon="pi pi-search" severity="warning" />
        </InputGroup>
        <DataViewLayoutOptions v-model="layout" />
      </div>
      <Divider/>
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
                <Skeleton width="50%" height="2rem" />
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
    <DataView v-else :value="events" :layout="layout" paginator :rows="8">
      <template #header>
        <div class="flex justify-content-between">
          <InputGroup class="search w-30rem">
            <AutoComplete v-model="value" :suggestions="items" @complete="search" />
            <Button icon="pi pi-search" severity="warning" />
          </InputGroup>
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>

      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(event, index) in slotProps.items" :key="index" class="col-12">
            <div
              class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="md:w-10rem relative">
                <img
                  class="block xl:block mx-auto border-round w-full"
                  :src="`https://primefaces.org/cdn/primevue/images/product/${event.image}`"
                  :alt="event.title"
                />
                <Tag
                  :value="event.inventoryStatus"
                  :severity="getSeverity(event)"
                  class="absolute"
                  style="left: 4px; top: 4px"
                ></Tag>
              </div>
              <div
                class="flex flex-column md:flex-row justify-content-between md:align-events-center flex-1 gap-4"
              >
                <div
                  class="flex flex-row md:flex-column justify-content-between align-events-start gap-2"
                >
                  <div>
                    <span class="font-medium text-secondary text-sm">{{
                        event.categoryEvent.name
                    }}</span>
                    <div class="text-lg font-medium text-900 mt-2">{{ event.title }}</div>
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow:
                          0 1px 2px 0 rgba(0, 0, 0, 0.04),
                          0 1px 2px 0 rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-900 font-medium text-sm">{{ event.id }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-column md:align-items-end gap-5">
                  <span class="text-xl font-semibold text-900">${{ event.location }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" outlined></Button>
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Get Ticket"
                      :disabled="event.inventoryStatus === 'OUTOFSTOCK'"
                      class="flex-auto md:flex-initial white-space-nowrap"
                      @click="goToEventDetail(event)"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div
            v-for="(event, index) in slotProps.items"
            :key="index"
            class="col-12 sm:col-6 md:col-6 xl:col-3 p-2"
          >
            <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
              <div class="surface-50 flex justify-content-center border-round p-3">
                <div class="relative mx-auto">
                  <img
                    class="border-round w-full"
                    :src="`https://primefaces.org/cdn/primevue/images/product/${event.image}`"
                    :alt="event.name"
                    style="max-width: 300px"
                  />
                  <Tag
                    :value="event.inventoryStatus"
                    :severity="getSeverity(event)"
                    class="absolute"
                    style="left: 4px; top: 4px"
                  ></Tag>
                </div>
              </div>
              <div class="pt-4">
                <div class="flex flex-row justify-content-between align-items-start gap-2">
                  <div>
                    <span class="font-medium text-secondary text-sm">{{
                        event.categoryEvent.name
                    }}</span>
                    <div class="text-lg font-medium text-900 mt-1">{{ event.title }}</div>
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow:
                          0 1px 2px 0 rgba(0, 0, 0, 0.04),
                          0 1px 2px 0 rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-900 font-medium text-sm">{{ event.rating }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-column gap-4 mt-4">
                  <span class="text-2xl font-semibold text-900">${{ event.price }}</span>
                  <div class="flex gap-2">
                    <Button
                      label="Event Detail"
                      style="background: var(--color-main)"
                      :disabled="event.inventoryStatus === 'OUTOFSTOCK'"
                      class="btn flex-auto white-space-nowrap"
                      @click="goToEventDetail(event)"
                    ></Button>
                    <Button class="btn" icon="pi pi-heart"></Button>
                    <Button class="btn" icon="pi pi-share-alt"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </section>
</template>

<style scoped></style>
