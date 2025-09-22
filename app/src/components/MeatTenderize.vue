<template>
    <div class="w-screen h-screen flex justify-center items-center relative">
    <div
    class="z-0 bg-no-repeat bg-[url('../assets/steak.png')] bg-center"
    style="width: 400px; height: 300px;"
    ></div>
    <div
        v-show="start"
        class="object-center bg-red-200 w-full h-64 font-cherry z-10 items-center justify-center flex"
    >
        <div
        @click="start = false"
        class="text-8xl text-center text-a-500 bubble-outline"
        >
        MASH THE SPACE BAR!
        </div>
    </div>
    </div>
    <div 
    class="w-[auto] h-[auto] z-10 bg-black"
    :style="{ 
        transform: `rotate(${hammerRotation}deg)`,
        transformOrigin: `bottom right`,
        backgroundImage: `url(${masher})`
    }"></div>
    <div>Hits: {{ amountMashed }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import masher from '../assets/masher.png'
//meat tenderizing
//basically just key mashing as fast as possible
//low skill and it fits overcookeds face paced theme
//for assets probably meat and a hammer 
const start = ref(true);
const hammerRotation = ref(0);

//based off of how many times the user clicks the hammer rotates to match the respective speed at which it was clicked
let negMulti = 1;
const amountMashed = ref(0);
window.addEventListener("keydown", function (e) {
    if(e.key == " ") {
        
        if(hammerRotation.value==0) {
            negMulti = 1
            amountMashed.value += 1;
        };
        if(hammerRotation.value==90) negMulti = -1;
        hammerRotation.value+=30 * negMulti;
        
    }
})

</script>

<style scoped>

.bubble-outline {
  color: white;
  -webkit-text-stroke: 2px black;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
}

</style> 