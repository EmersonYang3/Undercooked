<template>
    <JoinScreen v-if="!gameStarted" @start="gameStarted = true" role="client"></JoinScreen>
    <div v-else>
        <div v-if="!currentItemHeld">You are not currently holding an item</div>
        <div v-else>
            Current Held Item : {{ currentItemHeld }}
            <img :src="ImageLut[currentItemHeld]">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ImageLut } from '@/utils/lut';
import { usePlayerStore } from '@/stores/roleStores';
import JoinScreen from './JoinScreen.vue';
//join screen just routes to the respective location
let player_store = usePlayerStore();
const gameStarted = ref(false);
const currentItemHeld = ref<string | null>(null);
watch(() => player_store.inventory, (new_item) => {
    currentItemHeld.value = new_item;
})
</script>

<style scoped>

</style>