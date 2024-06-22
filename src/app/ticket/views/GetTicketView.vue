<script setup lang="ts">
import ToolbarComponent from '@/app/shared/components/ToolbarComponent.vue'
import { onMounted, ref } from 'vue'
import { EventModel } from '@/app/events/models/EventModel'
import router from '@/router'
import EventService from '@/app/events/services/EventService'

const imageSrc = "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NzY0ODgzNzUzNjQzNw%3D%3D/original/cda19e4c-ae11-47b1-831b-a29f94ab76dc.png?im_w=1200&im_q=highq";
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
function formatDate(dateString: any) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>

<template>
  <main>
    <ToolbarComponent label="Get Ticket" />
    <section class="event">
      <div class="container flex flex-column">
        <template v-if="loading">
          <div class="event__header flex justify-content-between">
            <div>
              <Skeleton width="200px" height="30px" class="mb-3" />
              <Skeleton width="300px" height="40px" />
            </div>
            <div class="buttons flex align-items-center gap-3">
              <Skeleton width="120px" height="40px" />
              <Skeleton width="40px" height="40px" />
              <Skeleton width="40px" height="40px" />
            </div>
          </div>
          <div class="event__content">
            <div class="detail">
              <Skeleton width="100%" height="20px" count="5" class="mb-3" />
              <Skeleton width="100px" height="20px" class="mb-3" />
              <Skeleton width="100px" height="20px" class="mb-3" />
              <Skeleton width="100px" height="20px" class="mb-3" />
              <Skeleton width="100%" height="2px" class="mb-3" />
              <Skeleton width="150px" height="20px" class="mb-1" />
              <Skeleton width="200px" height="20px" />
            </div>
            <div class="image">
              <Skeleton width="100%" height="30rem" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="event__header flex justify-content-between">
            <div>
              <span>{{ event.categoryEvent?.name }}</span>
              <h1>{{ event.title }}</h1>
            </div>
            <div class="buttons flex align-items-center gap-2">
              <Button
                icon="pi pi-shopping-cart"
                label="Get Now"
                class="btn flex-auto md:flex-initial white-space-nowrap"
              ></Button>
              <Button class="btn" type="button" icon="pi pi-heart" />
              <Button class="btn" type="button" icon="pi pi-share-alt" />
            </div>
          </div>
          <div class="event__content">
            <div class="detail">
              <p>{{ event.description }}</p>
              <p><b>Start Date:</b> {{ formatDate(event.startDate) }}</p>
              <p><b>End Date:</b> {{ formatDate(event.endDate) }}</p>
              <p><b>Location:</b> {{ event.location }}</p>
              <Divider />
              <div v-if="event.organizer" class="organizer flex flex-column">
              <span
              ><b>Organizer:</b> {{ event.organizer.firstName }}
                {{ event.organizer.lastName }}</span
              >
                <span v-if="event.organizer.email">{{ event.organizer.email }}</span>
              </div>
            </div>
            <div class="image">
              <img
                class="block xl:block mx-auto border-round w-full"
                :src="imageSrc"
                :alt="event.title"
              />
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<style scoped>

.event .container {
  padding: var(--space-pg);
  gap: var(--space-pg);
  .event__header {
    width: 100%;
    h1 {
      font-size: 2em;
      font-weight: bold;
    }
  }
  .event__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    gap: var(--space-pg);
    .detail {
      width: min(25rem, 100%);
    }
    .image {
      width: min(65rem, 100%);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: 16 / 9;
      }
    }
  }
}
</style>