<template>
    <div class="flex items-center h-screen">
        <div class="w-full h-64 bg-blue-300  items-center justify-center text-center">ligma</div>
    </div>
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
//set the user within a habitable range


</script>

<style scoped>

</style>