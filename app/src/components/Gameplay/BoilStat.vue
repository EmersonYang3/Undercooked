<template>
    <div v-if="internalTimer.id === null || internalTimer.item === null">       
        <img :src="internalTimer.item">
        {{ internalTimer.time_remaining }}
    </div>
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/rewrite/sockets';
import { useClientConnection } from './clientKeyPress';
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import { uniqueIdentifier } from '@shared/types';
import { ref, Ref } from 'vue';
const termStore = useTerminalStore();
const socketStore = useSocketStore();
const socket = socketStore.getSocket();
const {keyClient, startListening, stopListening} = useClientConnection(termStore.clientsKeys, onKeyPressed )
function onKeyPressed(key: string) {
    socket.emit("onSpecialKeyPressed", key);
}
type Timer = {
    time_remaining: null | number,
    id: null | uniqueIdentifier,
    item: null | string,
}
let startingTimer = null;
let internalTimer: Ref<Timer> = ref({
    time_remaining: null,
    id: null,
    item: null
    
});


let frameId: number | null = null;
function startGame() {
    const currentlyHeldItem = termStore.heldItem
    if (!currentlyHeldItem) {
        return new Error("There was no valid held item to be acted on")
    }
    internalTimer.value = {
        time_remaining: 6000, 
        id: 10,
        item: currentlyHeldItem.foodItems[0].name
    }
}
let last_tick = null;
function tick() {
    last_tick = performance.now();
    frameId = requestAnimationFrame(startGame);
}


</script>

<style scoped>

</style>