<template>
  <div class="flex flex-col items-center bg-white w-screen h-screen">
    <h1 class="text-4xl p-4 m-4">Current Recipes</h1>
    <div class="flex flex-row h-full w-full">
      <div class="relative bg-gray-400 w-32 h-64 text-white rounded-xl p-2 m-1" v-for="(item, index) in recipes" :key="index">
          {{ item }}
          
        <div class="bg-green-500 w-full h-4 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const recipes = reactive([1, 2, 3, 4, 5, 6, 7]);




</script>

<style scoped>

</style>