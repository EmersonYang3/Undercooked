<template>
    <div>
        {{ Math.floor(timer / 1000) }} s
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createStationGame } from '../clientTerm';
let rafhandle: null | number = null;
let timer = ref(0);
let current_time = 0;
let elapsedTime = 0;
//the terminal store items field is only for referencing and looking up 
//each terminal has to maintain their own unique item state due to how the terminals behave
const acceleration =  9.81;

function endGame() {
    cancelAnimationFrame(rafhandle);
}
function startGame() {
    elapsedTime = 0;
    current_time =  performance.now();
    rafhandle = requestAnimationFrame(update);
}
function endCondition():boolean {
    return false;
}
function update() {
    const delta_time = performance.now() - current_time;
    timer.value -= delta_time;
    current_time = performance.now();
    elapsedTime += delta_time;
    //do game calculations based off of delta time for consistency
    if (endCondition()) {
        endGame();
    }

    //trigger endGame here for 
    rafhandle = requestAnimationFrame(update);
}
onMounted(() => {
    initialize();
})

let initialize = createStationGame(startGame, endGame);
//will definitely have to merge the pollforClient thing with the createStationGame for rearming logic

</script>

<style scoped>

</style>