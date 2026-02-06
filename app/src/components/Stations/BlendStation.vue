<template>
    <div v-if="(pressCount/requiredPresses) < 1">
    {{ pressCount }} / {{ requiredPresses }} presses complete
    </div>
    <div v-else>
        Finished 
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createKeyTracker } from './eventListener';
import { useGameStore } from '@/stores/Shared/PlayerStore';
import { useSocketStore } from '@/stores/SocketStore';



let spaceKeyTracker = createKeyTracker(new Set([" "]));
const pressCount = ref<number | null>(null);
const requiredPresses = ref<number | null>(null);
const gameStore = useGameStore();
const clientkeys = gameStore.clientKeys;
const socketStore = useSocketStore();
const socket = socketStore.socket;
const waitTime = 1000;
const emits = defineEmits(["completed"]);

//emits back to the component that the game has been done
//each gameplay component must define this emit 



function downhandler(event: KeyboardEvent) {
    if (event.key ==  " ") {
        pressCount.value ++;
        if ((pressCount.value / requiredPresses.value) >= 1) {
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
function triggerStart(event: KeyboardEvent) {
    //this should not be handled here
    if (clientkeys.has(event.key.toLowerCase())) {
        socket.emit("specialKeyPressed", event.key.toLowerCase());
    
    }
}

onMounted(() => {
    document.addEventListener("keydown", triggerStart)
})


</script>

<style scoped>

</style>