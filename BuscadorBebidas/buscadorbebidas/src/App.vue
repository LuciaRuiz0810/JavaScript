<script setup>

import Header from './components/Header.vue';
import { RouterView, useRoute } from 'vue-router';


</script>

<template>
  <h1>Desde Pinia</h1>
  <Header />

  <main class="container mx-auto mt-10">
    <RouterView />
    
  </main>
</template>

<style scoped>

</style>
