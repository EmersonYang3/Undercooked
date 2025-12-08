<template>
    <JoinGame role="station" @start="reroute"></JoinGame>
</template>

<script setup lang="ts">
import JoinGame from '@/components/JoinGame.vue';
import { useTerminalStore } from '@/stores/roleStores';
import { useSocketStore } from '@/stores/sockets';
import { useRouter } from 'vue-router';
//route based off of the station type that got set
const terminalStore = useTerminalStore();
const socketStore = useSocketStore();
const router = useRouter();
function reroute(start:boolean) {
    if(!terminalStore.isReady) { 
        console.log("terminal could not connect to the backend");
        return;
    }
    if (terminalStore.station) {
        router.push(`/${terminalStore.station}`);
    }
}
</script>

<style scoped>

</style>