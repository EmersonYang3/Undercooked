<template>
    <!-- if show item is on coo -->
    <div v-if="!listening">
        <div>
            Press your client key to interact with the station
        </div>
        <div v-if="cantAct">
            Station cannot act on this item. Try another station.
        </div>
        Current held item in station: {{ terminalStore.heldItem }}
        <img :src="'placeholder'">
    </div>
    <div v-else>
        <div>
            <!-- gameplay area -->
        </div>

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
const listening = ref<boolean>(false);
const cantAct = ref<boolean>(false);
let frameID = null;

const currentTime = ref<number | null>(null);
const pressedKeys: Set<string> = new Set();


function startGame(key: string) {
    socket.emit("specialKeyPressed", terminalStore.id,  key);
    if (terminalStore.heldItem.foodItems.length == 0) {
        //means that nothing got placed and thus should not do anything
        //this can be for when the item is invalid or when the client is picking up the items
        cantAct.value = true;
        startListening();
        return;
    }
    listening.value = true;
    currentTime.value = performance.now();
    document.addEventListener("keydown", (event: KeyboardEvent) => {
        const pressedKey = event.key.toLowerCase();

    }); 
    requestAnimationFrame(gameLoop);
    endGame();
}

function gameLoop() {
    let deltaTime = performance.now() - currentTime.value;
    currentTime.value = performance.now(); 
       
    if (endCondition()) {
        cancelAnimationFrame(frameID);
        return;
    }
    frameID = requestAnimationFrame(gameLoop);
}

function endCondition(): boolean {
    return false;
}

function bindListenerToSet(event: KeyboardEvent) {
    pressedKeys.add
}

function endGame() {
    currentTime.value = null;
    listening.value = false;
    startListening();
}
const { startListening, stopListening } = acquireEventListener(terminalStore.clientsKeys, startGame);
onUnmounted(() => {
    stopListening();
})
onMounted(() => {
    startListening();
})

</script>
