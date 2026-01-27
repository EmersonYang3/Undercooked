<template>    
    <div v-if="!roleStore.isConnected">
        <p> ~Waiting Room~</p>
        <p> Wait for host approval to connect!</p>
        <p>Lobby Code:</p>
        <CodeArea/>
    </div>
    <div v-if="roleStore.isConnected && !roleStore.isActive">
        Waiting for host to start game
    </div>    
</template>

<script setup lang="ts">
import {usePlayerStore, useTerminalStore } from '@/stores/rewrite/roleStores';
const socketStore = useSocketStore();
const gameRole = socketStore.gameRole;
import CodeArea from '../Waiting/CodeArea.vue';
import { useSocketStore } from '@/stores/SocketStore';
const roleTable = {
    "client": usePlayerStore(),
    "station": useTerminalStore(),
}
const roleStore = roleTable[gameRole];
</script>

<style scoped>

</style>