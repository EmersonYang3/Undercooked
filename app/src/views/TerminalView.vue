<template>
    <JoinGame role="station"></JoinGame>
</template>

<script setup lang="ts">
import JoinGame from '@/components/JoinGame.vue';
import { useTerminalStore } from '@/stores/roleStores';
import { useRouter } from 'vue-router';
//route based off of the station type that got set
const terminalStore = useTerminalStore();
const router = useRouter();
function reroute() {
    if (terminalStore.station) {
        router.push(`/${terminalStore.station}`);
    }
}



</script>

<style scoped>

</style>