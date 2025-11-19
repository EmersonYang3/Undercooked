<template>
  <div class="w-full p-6">
    <h2 class="text-6xl font-bold mb-4 text-center">Recipe Selector</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="(ingredients, dishName) in dishToPrepared"
        :key="dishName"
        @click="selectDish(dishName)"
        class="cursor-pointer rounded-lg border border-gray-300 bg-white hover:shadow-lg transition p-3 flex flex-col items-center"
        :class="{ 'ring-4 ring-blue-400': selectedDish === dishName }"
      >
        <img
          :src="ImageLut[dishName]"
          :alt="dishName"
          class="w-20 h-20 object-contain pixel-sprite"
        />
        <p class="text-center mt-2 font-semibold text-sm">{{ dishName }}</p>
      </div>
    </div>
    <div
      v-if="selectedDish"
      class="mt-8 p-6 bg-gray-100 border border-gray-300 rounded-xl shadow"
    >
      <h3 class="text-2xl font-bold mb-4 text-center">
        {{ selectedDish }} Ingredients
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="(ingredient, idx) in dishToPrepared[selectedDish]"
          :key="idx"
          class="flex flex-col items-center"
        >
          <img
            :src="ImageLut[ingredient] || '/fallback.png'"
            :alt="ingredient"
            class="w-16 h-16 object-contain pixel-sprite"
          />
          <p class="mt-2 font-medium text-sm text-center">{{ ingredient }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//this is for the actual preparation area
import { ref } from 'vue';
import { dishToPrepared } from '@/utils/lut';
import { ImageLut } from '@/utils/lut';

const selectedDish = ref<string | null>(null);

function selectDish(dish: string) {
  selectedDish.value = dish;
}
</script>

<style scoped>
.pixel-sprite {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
