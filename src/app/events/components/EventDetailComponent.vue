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
        <div class="image">
          <img
            class="block xl:block mx-auto border-round w-full"
            :src="imageSrc"
            :alt="event.title"
          />
        </div>
        <div class="detail bg-filter">
          <h1>{{ event.title }}</h1>
          <p><b>Description:</b> {{ event.description }}</p>
          <p><b>Start Date:</b> {{ formatDate(event.startDate) }}</p>
          <p><b>End Date:</b> {{ formatDate(event.endDate) }}</p>
          <p><b>Location:</b> {{ event.location }}</p>
          <p><b>Category:</b> {{ event.categoryEvent?.name }}</p>
          <div v-if="event.organizer">
            <p><b>Organizer:</b> {{ event.organizer.firstName }} {{ event.organizer.lastName }}</p>
            <p v-if="event.organizer.email"><b>Email:</b> {{ event.organizer.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event .container {
  //max-width: 1200px;
  .event__content {
    display: flex;
    flex-wrap: wrap;
    //justify-content: space-between;
    .image {
      margin-right: 20px;
      max-width: min(50rem, 100%);
      img {
        width: 100%;
      }
    }
    .detail {
      width: min(30rem, 100%);
      h1 {
        font-size: 2em;
        font-weight: bold;
      }
      p {
        b {
          font-weight: bold;
        }
      }
    }
  }
}
</style>