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
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import { useSocketStore } from '@/stores/rewrite/sockets';
import { ImageLut } from '@/utils/ImageLut';
import { holdableItem } from '@shared/types';
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

    if (stationStore.heldItem) {
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
function startGame(heldItem: holdableItem) {
    currentlyCookingItem.item = heldItem.foodItems[0].name;
    currentlyCookingItem.cookingTime = CookTime;
    setInterval(() => {
        if (currentlyCookingItem.cookingTime == 0) {
            endGame()
            currentlyCookingItem.cookingTime = null;
            currentlyCookingItem.item = null;
            return;
        }
        currentlyCookingItem.cookingTime -= 1000; 
    }, 1000);
}


watch(() => stationStore.heldItem, startGame)

</script>

<style scoped>

</style>