<template>
    <div v-if="start">
        <div v-if="currentlyCookingItem.cookingTime == 0">
            Item is done cooking. Pick it up by pressing your client key
        </div>
        <div v-else>
            {{ currentlyCookingItem.cookingTime / 1000 }} ms
        </div>
        {{ currentlyCookingItem.item }} 
        {{ ImageLut[currentlyCookingItem.item] }}
    </div>
    <div v-else>
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


const currentlyCookingItem =  reactive({
    item: null,
    cookingTime: null, 
});
const CookTime = 3 * 1000;

const start:Ref<boolean>=  ref(false);
function onkeyPressed(key: string) {
    socket.emit("onSpecialKeyPressed", Number(stationStore.id), key );

    if (stationStore.currentHelditem) {
        //Means the item has been done and the user can pick it up
        return;
    }
    //Means the item has just been placed

    stopListening();
    start.value = true;
}

function endGame() {
    startListening();
    start.value = false;
}
function startGame(heldItem: string) {
    currentlyCookingItem.item = heldItem;
    currentlyCookingItem.cookingTime = CookTime;
    setInterval(() => {
        if (currentlyCookingItem.cookingTime == 0) {
            endGame
            currentlyCookingItem.cookingTime = null;
            currentlyCookingItem.item = null;
            return;
        }
        currentlyCookingItem.cookingTime -= 1000; 
    }, 1000);
}


watch(() => stationStore.currentHelditem, startGame)

</script>

<style scoped>

</style>