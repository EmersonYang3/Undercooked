<template>
    <ItemShower :role="'terminal'"></ItemShower>
</template>

<script setup lang="ts">
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import ItemShower from './ItemShower.vue';
import { useSocketStore } from '@/stores/rewrite/sockets';
import { useClientConnection } from './clientKeyPress';
const termStore = useTerminalStore();
const socketStore = useSocketStore();
const socket = socketStore.getSocket();
useClientConnection(termStore.clientsKeys, onKeyPressed);
function onKeyPressed(key: string) {
    socket.emit("onSpecialKeyPressed", key);
}
</script>

<style scoped>

</style>