<template>
    <div v-if="(pressCount/requiredPresses) < 1">
    {{ pressCount }} / {{ requiredPresses }} presses complete
    </div>
    <div v-else>
        Finished the game
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const pressCount = ref<number | null>(null);
const requiredPresses = ref<number | null>(null);
const waitTime = 1000;
const emits = defineEmits(["completed"]);

function downhandler(event: KeyboardEvent) {
    if (event.key ==  " ") {
        pressCount.value ++;
        if (pressCount.value  >= requiredPresses.value ) {
            //end the game
            setTimeout(()=>{}, waitTime);
            //add a timeout to display the completed message
            emits("completed");
        }
    }
}
function uphandler(event: KeyboardEvent) {
    if (event.key == " ") {
        pressCount.value
    }
} 

function startGame() {
    pressCount.value = 0;
    requiredPresses.value = 12;
    bindListener();
}

function bindListener() {
    document.addEventListener("keydown", downhandler);
    document.addEventListener("keyup", uphandler);
}

onMounted(()=> {
    startGame();
})
</script>

<style scoped>

</style>