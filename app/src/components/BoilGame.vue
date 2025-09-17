<template>
    <div class="flex items-center h-screen" v-show="test">
        <div class="w-full h-32 bg-blue-300  items-center text-center text-[4rem] leading-none font-bungee">
            <input type="button" placeholder="keowoefowjofiwfoijw" class="bg-black w-12 h-12" @click="stupid">
            START
        </div>
    </div>
    <div class="flex justify-center rounded-full h-16 w-16 bg-black items-center">
        <div class="rounded-full h-12 w-12 bg-white text-center">{{ progress }}</div>
    </div>
    <div @click="handleStove" class=""></div>
    <circle></circle>
</template>

<script setup lang="ts">
//make a circle for the progress thingie
//make the slider increase based off of progress - this could be applied to the cookflip component
//for this we want the slider to decrease at a steady rate
//the user must click at a good enough pace to maintain it in a good zone 
//maintain a range variable
//maintain a current progress variable
//every frame compare if out of range
//if out of range calculate penalty based off of how long out of it
//have a number to make it less of a guessing game for the user
import { ref } from 'vue';
const progress = ref(0);
const test = ref(true);




function handleStove() {
    //this function increases the temperature
}
function update() {

}

function stupid() {
    test.value = !test.value
}

requestAnimationFrame(update)


//set the user within a habitable range


</script>

<style scoped>

</style>