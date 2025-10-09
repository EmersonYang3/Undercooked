<template>
    <div>

    </div>
</template>

<script setup lang="ts">
    //basic pieces 
const tetrisBlocks = [];
function spawnBlock() {
    const randomIndex =  Math.floor(Math.random() * tetrisBlocks.length);
    const block = tetrisBlocks[randomIndex];
    //select a random selection of shapes from the list
}
function update() {
    //update the frame every 0.5seconds instead of as fast as possible
    //mimics retro tetris
    //basic formula
    //spawn block
    //block moves
    //check if block has any manhattan neighbors. if yes continue to next step
    ///check if block can move any further down by running a function that attempts to place the whole block down
    //if conflicts with pre existing blocks then place block previously
    //otherwise continue on 
    //checking for valid rows 
    //theres prob a more efficient approach than what i put
    //just iterate thru the rows with a actual stuff in them which id use an array for 
    //prevents checking all rows
    
}


</script>

<style scoped>

</style>