<template>
  <div class="flex flex-col w-screen h-screen bg-black text-white">
    <h1 class="text-5xl md:text-7xl lg:text-9xl font-bold bg-red-600 text-center py-6 mb-6 rounded-4xl">
      Recipe Browser
    </h1>
    <div class="flex flex-wrap justify-center gap-4 px-4 overflow-auto">
      <div
        v-for="(value, index) in recipe_lookup[test]"
        :key="index"
        class="relative flex flex-col items-center justify-center bg-gray-700 rounded-xl aspect-square w-64 sm:w-56 md:w-60 lg:w-72 p-2 hover:scale-105 transition-transform duration-200"
      >
        <img
          class="pixel-sprite rounded-lg bg-gray-300 w-full h-full object-contain"
          :src="ImageLut['Avocado toast']"
          alt="Recipe Image"
        />

        <div
          class="absolute bottom-0 w-full bg-gray-900/80 text-xs sm:text-sm rounded-b-xl py-1"
        >
          Final Item: {{ value[1].final_item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recipe_lookup, ImageLut } from '@/utils/lut';
let test = "deep_fryable";
function show_recipe() {

}
</script>

<style scoped>
.pixel-sprite {
    width:100%;
    height:100%;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges; /* fallback for older Firefox */
    image-rendering: crisp-edges;
}

</style>