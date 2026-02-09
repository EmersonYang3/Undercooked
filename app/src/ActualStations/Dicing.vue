<template>
    <div>
        Press the SPACE button to start dicing. 
    </div>
    <div v-if="!finished">
        Amount of times pressed: {{ pressCount }} / {{ requiredPressedCount }}
    </div>
    <div v-else>
        Finished chopping the item into pieces. 
    </div>
</template>

<script setup lang="ts">
import { trackKeyPress } from '@/services/NotificationHandlerDispatcher/keyHandlers';
import { onMounted, ref } from 'vue';
const key = " ";
const requiredPressedCount = 10;

const pressCount = ref<number>(0);
const finished = ref<boolean>(false);

const pressTracker = trackKeyPress(key, callback, endCondition, updateCounter);

function updateCounter(count: number) {
    pressCount.value = count;
}   

function endCondition(count: number): boolean {
    return count < requiredPressedCount;
}

function callback() {
    finished.value = true;
}

onMounted(() => {
    pressTracker.arm();
})



</script>

<style scoped>

</style>