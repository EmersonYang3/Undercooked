<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { trackKeyPress } from '@/services/NotificationHandlerDispatcher/keyHandlers';
import { ref } from 'vue';
const pressTracker = trackKeyPress(key, endCondition, );
const key = " ";
const pressCount = ref<number>(0);
const requiredPressedCount = 10;
function updateCounter(count: number) {
    pressCount.value = count;

}   
function endCondition(count: number): boolean {
    return count < requiredPressedCount;
}
function callback() {

}
</script>

<style scoped>

</style>