<template>
    <div>

    </div>
</template>

<script setup lang="ts">
//meat tenderizing
//basically just key mashing as fast as possible
//low skill and it fits overcookeds face paced theme
//for assets probably meat and a hammer 
const keypresspersecond = 1;
let keyPressed = 0;
let timeElapsed = 0;
let current = 0;
let lastSecond = Math.floor(performance.now()/1000); //sets the current second based off of the last second
window.addEventListener("keydown", handleKeyDown)
function handleKeyDown() {
    
}
</script>

<style scoped>

</style> 