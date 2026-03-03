<template>
    <div>
        Hold Space to start blending.
    </div>
    <div v-if="isBlending">
        <!-- gif of the blender blending -->
        Blender is blending
    </div>
    <div v-if="finishedBlending">
        Finished blending.
        Final item has been placed in the holder. 
    </div>
</template>

<script setup lang="ts">
import { createHoldTracker } from '@/services/keyHandlers';
import { onMounted, ref } from 'vue';
const emits = defineEmits(["completed"]);

const trackedKey = " ";
const duration = 1000;

const isBlending = ref<boolean>(false);
const finishedBlending = ref<boolean>(false);

const holdChecker = createHoldTracker(
    trackedKey,
    initialClick,
    onRelease,
)

function initialClick() {
    isBlending.value = true;
    //play an audio of the blender blending 
}

function onRelease() {
    if (holdChecker.getCurrentHoldDuration() < duration) {
        //reset the progress
        holdChecker.disarm();
        holdChecker.arm();
    }
}
onMounted(() => {
    holdChecker.arm();
})
</script>

<style scoped>

</style>
