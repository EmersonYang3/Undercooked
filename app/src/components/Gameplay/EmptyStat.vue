<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/rewrite/sockets';
import { useClientConnection } from './clientKeyPress';
import { useTerminalStore } from '@/stores/rewrite/roleStores';

const termStore = useTerminalStore();
const socketStore = useSocketStore();
//socket should alsways be valid as without a socket you cant route to the respective terminl

const socket = socketStore.getSocket();
const { keyClient, startListening, stopListening} = useClientConnection(termStore.clientsKeys, onKeyPressed);

function onKeyPressed(key: string) {
    socket.emit("onSpecialKeyPressed", key);
}

</script>

<style scoped>

</style>