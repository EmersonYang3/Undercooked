<template>
    <!-- if show item is on coo -->
    <div v-if="!cooldown">
        Current held item in station: {{ terminalStore.heldItem }}
        <img :src="'placeholder'">
    </div>
    <div v-else>
        Submission is on cooldown, wait a second
    </div>
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/SocketStore';
import { acquireEventListener } from './eventListener';
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import { onMounted, onUnmounted, ref } from 'vue';

const socketStore = useSocketStore();
const socket = socketStore.socket;
const terminalStore = useTerminalStore();

const cooldown = ref<boolean>(false);

function startGame(key: string) {
    socket.emit("specialKeyPressed", terminalStore.id,  key)
    cooldown.value = true;
    setTimeout(() => {
        cooldown.value = false;
        startListening();
    }, 1000)
}
const { startListening, stopListening } = acquireEventListener(terminalStore.clientsKeys, startGame);
onUnmounted(() => {
    stopListening();
})
</script>
