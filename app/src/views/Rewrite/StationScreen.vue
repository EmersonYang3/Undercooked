<template>
    <JoinScreen v-if="!gameStarted" @start="gameStarted = true" role="station"></JoinScreen>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import JoinScreen from './JoinScreen.vue';
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import router from '@/router/rewrite';
const gameStarted = ref(false);
const stationStore = useTerminalStore();
watch(() => gameStarted, (started) => {
    if (!started.value) {
        return;
    }
    let stationtype = stationStore.station;
    router.push(`/terminal/${stationtype}`);
})
//simple routing function
</script>

<style scoped>

</style>