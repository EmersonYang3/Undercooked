<template>
    <div
        v-if="start"
        class="flex flex-col items-center justify-center gap-4 p-6 text-center"
    >
        <div
            v-if="currentlyCookingItem.cookingTime === null"
            class="text-green-400 font-semibold text-xl"
        >
            Item is done cooking.  
            <div class="text-sm text-gray-300 mt-1">
                Press your client key to pick it up
            </div>
        </div>

        <div
            v-else
            class="text-4xl font-bold text-yellow-300"
        >
            {{ Math.round(currentlyCookingItem.cookingTime / 1000) }} s
        </div>

        <div class="flex flex-col items-center gap-1 text-lg">
            <div class="font-medium">
                {{ currentlyCookingItem.item }}
            </div>
            <div class="opacity-80">
                {{ ImageLut[currentlyCookingItem.item] }}
            </div>
        </div>
    </div>

    <div
        v-else
        class="flex items-center justify-center h-full bg-red-500 text-white text-3xl font-semibold text-center p-6"
    >
        Press your client key to start
    </div>
</template>


<script setup lang="ts">
import { useClientConnection } from './clientKeyPress';
import { useTerminalStore } from '@/stores/roleStores';
import { useSocketStore } from '@/stores/sockets';
import { ImageLut } from '@/utils/lut';
import { reactive, Ref, ref, watch } from 'vue';
const stationStore = useTerminalStore();
const socketStore = useSocketStore();
let socket = socketStore.getSocket();
const { keyClient, stopListening, startListening} = useClientConnection(stationStore.clientsKeys, onkeyPressed);


const currentlyCookingItem = reactive<{
    item: string | null;
    cookingTime: number | null;
}>({
    item: null,
    cookingTime: null,
});

const CookTime = 3 * 1000;

const start:Ref<boolean>=  ref(false);
function onkeyPressed(key: string) {
    socket.emit("onSpecialKeyPressed", Number(stationStore.id), key );
}

function endGame() {
    startListening();
    start.value = false;
}
//break this apart
let intervalId = null;
function startGame(heldItem: string) {
    if (intervalId) {
        return new Error("Overlapping interval timers")
    }
    currentlyCookingItem.item = heldItem;
    currentlyCookingItem.cookingTime = CookTime;
    start.value = true;
    stopListening();
    intervalId = setInterval(() => {
        if (currentlyCookingItem.cookingTime <= 0) {
            endGame()
            currentlyCookingItem.cookingTime = null;
            currentlyCookingItem.item = null;
            clearInterval(intervalId);
            return;
        }
        currentlyCookingItem.cookingTime -= 500; 
    }, 500);
}


watch(() => stationStore.currentHelditem, (item) => {if (item) startGame(item);});

</script>

<style scoped>

</style>