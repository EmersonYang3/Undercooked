<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useTerminalStore } from '@/stores/roleStores';
import { useClientConnection } from './clientKeyPress';
import { useSocketStore } from '@/stores/sockets';
const stationStore = useTerminalStore();
const socket = useSocketStore().getSocket();
useClientConnection(stationStore.clientsKeys, startGame)
function startGame(key: string) {
    socket.emit("clientKeyPressed", stationStore.id, key);
}
</script>

<style scoped>

</style>