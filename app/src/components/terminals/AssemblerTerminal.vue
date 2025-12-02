<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useTerminalStore } from '@/stores/roleStores';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { pollForClient } from '../clientTerm';
import { useSocketStore } from '@/stores/sockets';
import { Socket } from 'socket.io-client';



const socketStore = useSocketStore();
let socket: null | Socket = null;
let rafhandle: number | null = null;
const terminalStore = useTerminalStore();
let clientKeys:null | Set<string> = null;
const { clientKey , startListening } = pollForClient(clientKeys);
function initialize() {
    if (terminalStore.clientsKeys != null || terminalStore.clientsKeys.length == 0) {
        console.log("could not find client keys or client keys length was 0")
    }
    clientKeys =  new Set(terminalStore.clientsKeys);
    socket = socketStore.getSocket();
    watch(clientKey, (key) => {
        if (key) start(key);
    })
    //fetch the client keys from the    
}
function start(key: string) {
    let info = socket.emit("requestPlayerInfo", key);
    if(info == null) { 
        //return that the player doesnt have any items
        //rearm the listener 
        endGame();
    } else {
        rafhandle = requestAnimationFrame(update);        
    }
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