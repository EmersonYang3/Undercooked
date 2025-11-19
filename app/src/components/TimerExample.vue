<template>
    <div class="w-screen h-screen bg-black" v-if="!started">
        <!-- waiting screen -->
        Press Your Client Key
    </div>
    <div class="w-screen h-screen bg-black" v-if="started">
        <!-- this outter div should not be used as a container its to ensure proper styles -->
        <!-- actual game logic stuff -->
    </div>
</template>

<script setup lang="ts">
//more so an example than actual functional code to be used 
//timer-based
import { watch, ref } from 'vue';
import { useClientConnection } from './clientTerm';

const started = ref(false);


//this could probably be wrapped even more
//might make the code too complex though
//maybe break it into a category
//timer-based vs condtion-based composable possibly??

const clientKeys = new Map([["a", true]]);
const { keyClient, startListening } = useClientConnection(clientKeys);
let rafHandle: number | null = null;
let currentTime = 0;
let elapsedTime = 0;
//stored in miliseconds as per performance.now() format;
watch(keyClient, (key)=> {
    if (key) startGame(key);
})

function startGame(key: string) {

    console.log("Starting game for client: ", key);
    //do some prelimanary logic like backend connection and whatnot here
    //trigger the loop
    started.value = true;    
    //if update stalls it might mess up deltatime
    currentTime = performance.now();
    update();
}
//example function for time based condition
function endCondition():boolean {
    if (elapsedTime >= 100 * 1000) { 
        return true;
    }
    return false;
}
function update() {
    const now = performance.now();
    const deltaTime = now - currentTime;
    currentTime = now;
    elapsedTime += deltaTime;
    if(endCondition()) {
        endGame()
        return;
    }
    rafHandle = requestAnimationFrame(update);
}
function endGame() {
    if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
    }  
    //reset all the states
    elapsedTime = 0;
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