<template>
    <div v-if="!startScreen">
    
    </div>
</template>

<script setup lang="ts">
import { useTerminalStore } from '@/stores/roleStores';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { createStationGame, pollForClient } from '../clientTerm';
import { useSocketStore } from '@/stores/sockets';
import { Socket } from 'socket.io-client';

//get the set based off of the socket store


const socketStore = useSocketStore();
const startScreen= ref(false);
let socket: null | Socket = null;
let rafhandle: number | null = null;
const terminalStore = useTerminalStore();
let clientKeys:null | Set<string> = null;
const { initialize, startListening, stopListening} = createStationGame(endGame, startGame);
initialize();
watch(terminalStore.heldItems, () => {    
    requestAnimationFrame(update);
    startGame(); 
    //start the game as the heldItems have changed
})
function startGame() {
    //add the game logic here
    
}


function endGame() {
    //reset game state
    //this is not something that should be made into part of the component
    //rearm the listener
    startListening();
}
//specific to eachg station type
//could be timer based or some other condition
function endCondition(): boolean {
    return false
}

function update() {
    if(endCondition()) {
        endGame();
    }
    
//calculate delta values here
//use delta values for the game 
    rafhandle = requestAnimationFrame(update);
}


</script>

<style scoped>

</style>