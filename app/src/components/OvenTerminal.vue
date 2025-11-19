<template>
    <div class="w-screen h-screen bg-green-300" v-if="!started">
        <!-- waiting screen -->
        <div class="w-full h-full flex flex-col justify-center item-center text-center text-9xl">
            <!-- use a different font for this -->
            Press your Client Key
        </div>
    </div>
    <div class="w-screen h-screen bg-red-500" v-if="started">
        <div class="bg-white">
            Timer: {{ Math.floor(Math.floor(elapsedTime)/1000) }}
        </div>
        
        <!-- this outter div should not be used as a container its to ensure proper styles -->
        <!-- actual game logic stuff -->
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useClientConnection } from './clientTerm';

const started = ref(false);
const clientKeys = new Map([["a", true]]);
const { keyClient, startListening } = useClientConnection(clientKeys);
let rafHandle: number | null = null;
let currentTime = 0;
let elapsedTime = ref(0);
watch(keyClient, (key)=> {
    if (key) startGame(key);
})

function startGame(key: string) {

    console.log("Starting game for client: ", key);
    started.value = true;    
    currentTime = performance.now();
    update();
}
function endCondition():boolean {
    if (elapsedTime.value >= 10 * 1000) { 
        return true;
    }
    return false;
}
function update() {
    const now = performance.now();
    const deltaTime = now - currentTime;
    currentTime = now;
    elapsedTime.value += deltaTime;
    if(endCondition()) {
        endGame()
        return;
    }
    rafHandle = requestAnimationFrame(update);
}
function endGame() {
    console.log("ending game");
    if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
    }  
    //reset all the states
    elapsedTime.value = 0;
    keyClient.value = null;
    started.value = false;
    //re-arm to accept another client after finished
    startListening();
}
//main structure complete
//just figure out backend/socket logic 

</script>

<style scoped>

</style>