<template>
    <div class="object-center bg-red-500 w-full h-32 font-cherry">
        <div class="text-8xl text-center text-a-500 bubble-outline">Mash the Space BAR!</div>
    </div>
    <div 
    class="bg-no-repeat w-[auto] h-[auto] z-10"
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