<template>
    <ItemShower :role="'terminal'"></ItemShower>
</template>

<script setup lang="ts">
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import { useClientConnection } from './clientKeyPress';
import { useSocketStore } from '@/stores/rewrite/sockets';
import ItemShower from './ItemShower.vue';
const stationStore = useTerminalStore();
const socket = useSocketStore().getSocket();
useClientConnection(stationStore.clientsKeys, startGame);
function startGame(key: string) {
    socket.emit("specialKeyPressed", stationStore.id, key);
}
</script>

<style scoped>

</style>