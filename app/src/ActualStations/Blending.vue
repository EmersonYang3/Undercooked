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
import { createHoldChecker } from '@/services/keyHandlers';
import { onMounted, ref } from 'vue';

const emits = defineEmits(["completed"]);

const trackedKey = " ";
const duration = 1000;

const isBlending = ref<boolean>(false);
const finishedBlending = ref<boolean>(false);

const holdChecker = createHoldChecker(
    trackedKey,
    duration,
    initialClick,
    onRelease,
)

function initialClick() {
    isBlending.value = true;
    //play an audio of the blender blending 
}

function onRelease(completed: boolean) {
    if (!completed) {
        holdChecker.disarm();
        holdChecker.arm();
    } else {
        isBlending.value = false;
        finishedBlending.value = true;
        setTimeout(() => {
            emits("completed");
        }, 1000); 
    }
}
onMounted(() => {
    holdChecker.arm();
})
</script>

<style scoped>

</style>
