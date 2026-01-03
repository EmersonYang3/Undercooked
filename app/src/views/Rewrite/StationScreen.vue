<template>
    <JoinScreen v-if="!gameStarted" @start="gameStarted = true" role="station"></JoinScreen>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import JoinScreen from './JoinScreen.vue';
import { useTerminalStore } from '@/stores/roleStores';
import router from '@/router';
const gameStarted = ref(false);
const stationStore = useTerminalStore();
function route() {
    let stationtype = stationStore.station;
    router.push(`/terminal/${stationtype}`);
}
watch(() => gameStarted, (started) => {
    if (!started.value) {
        return;
    }
    route();
})
//simple routing function
</script>

<style scoped>

</style>