<template>
    <div v-for="recipe in recipes" class="recipe-container mb-5 p-4 border border-gray-300 rounded-lg bg-gray-100">
        <h3 class="recipe-name text-xl font-bold text-gray-800 mb-3">
            Food to cook: {{ foodData[recipe].name }}
        </h3>
        <p class="required-items-header text-lg text-gray-600 font-semibold mb-3">
            Required items:
        </p>
        <div v-for="item in foodData[recipe].requiredItems" class="item-container flex items-center mb-3">
            <p class="item-name text-base text-gray-800 mr-4 grow">
                Name: {{ item }}
            </p>
            <img :src="ImageLut[item]" alt="Item Image" class="item-image w-10 h-10 object-cover rounded-sm transition-transform duration-300 ease-in-out hover:scale-110"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ImageLut } from '@/utils/ImageLut';
import foodData from '@shared/data/foodData';
const props = defineProps<{ recipes: Array<string> }>();
</script>
