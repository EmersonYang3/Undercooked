<template>
    <div>
        <div v-if="playerStore.heldItem">
            <div class="z-9" v-if="playerStore.heldItem.isPlated">
            </div>
            <div class="z-10">
                <div v-for="item in playerStore.heldItem.foodItems" :key="item.id">
                    <div>
                        {{ item.name }}
                    </div>
                    <!-- replace with lut thingie -->
                    <img :src="ImageLut[item.name]">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/rewrite/roleStores';
import { ImageLut } from '@/utils/ImageLut';

const playerStore = usePlayerStore();
let playerItem = playerStore.heldItem;


</script>

<style scoped>

.pixel_art {

}


</style>