<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { trackKeyPress } from '@/services/NotificationHandlerDispatcher/keyHandlers';
import { onMounted, ref } from 'vue';
const key = " ";
const requiredPressedCount = 10;
//decide the time allocations at the beginning. 
//everytime maintain a 
const timeAllocations = [];


function updateCounter() {

}

</script>

<style scoped>

</style>