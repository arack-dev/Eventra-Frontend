<script setup lang="ts">
</script>

<template>
  <div class="container-notFound">
    <h1>Not Found</h1>
    <h3>Página no encontrada<b> - 404</b></h3>
    <router-link to="/">
      <Button class="btn" label="Go back to Home" severity="success" />
    </router-link>
  </div>
</template>

<style scoped>
.container-notFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: black;
  gap: 1rem;

  :is(h1) {
    font-size: 5rem;
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }
  :is(h3) {
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }
}
@media screen and (max-width: 768px) {
  .container-notFound {
    :is(h1) {
      font-size: 3rem;
    }
    :is(h3) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
@media screen and (max-width: 425px) {
  .container-notFound {
    :is(h1) {
      font-size: 2rem;
    }
  }
}
</style>
