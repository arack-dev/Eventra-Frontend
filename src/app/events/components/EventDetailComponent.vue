<script setup lang="ts">
import { defineProps } from 'vue'
const { event, loading } = defineProps(['event', 'loading']);

const imageSrc = "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NzY0ODgzNzUzNjQzNw%3D%3D/original/cda19e4c-ae11-47b1-831b-a29f94ab76dc.png?im_w=1200&im_q=highq";

function formatDate(dateString: any) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>

<template>
  <section class="event">
    <div class="container">
      <div class="event__content">
        <div class="box-1">
          <div class="item__detail">
            <span>{{ event.categoryEvent?.name }}</span>
            <h1>{{ event.title }}</h1>
            <p>{{ event.description }}</p>
            <p><b>Start Date:</b> {{ formatDate(event.startDate) }}</p>
            <p><b>End Date:</b> {{ formatDate(event.endDate) }}</p>
            <p><b>Location:</b> {{ event.location }}</p>
            <Divider/>
            <div v-if="event.organizer" class="organizer flex flex-column">
              <span><b>Organizer:</b> {{ event.organizer.firstName }} {{ event.organizer.lastName }}</span>
              <span v-if="event.organizer.email">{{ event.organizer.email }}</span>
            </div>
          </div>
        </div>
        <div class="box-2 flex flex-column">
          <div class="item__header flex gap-3">
            <Button
              icon="pi pi-shopping-cart"
              label="Get Ticket"
              :disabled="event.inventoryStatus === 'OUTOFSTOCK'"
              class="flex-auto md:flex-initial white-space-nowrap"
            ></Button>
            <Button type="button" icon="pi pi-heart" outlined />
          </div>
          <div class="item__image">
            <img
              class="block xl:block mx-auto border-round w-full"
              :src="imageSrc"
              :alt="event.title"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event .container {
  padding: var(--space-pg);
  //max-width: 1200px;
  .event__content {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-pg);
    .box-1 {
      width: min(30rem, 100%);
      .item__detail {
        h1 {
          font-size: 2em;
          font-weight: bold;
        }
      }
    }
    .box-2 {
      width: 30rem;
      flex-grow: 1;
      gap: var(--space-pg);

      .item__header {
        display: flex;
        justify-content: end;
        align-items: center;

      }
      .item__image {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 16 / 9;
        }
      }
    }
  }
}
</style>