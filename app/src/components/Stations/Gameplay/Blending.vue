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
import { onMounted, ref } from 'vue';
const emits = defineEmits(["completed"]);

const trackedKey = " ";
const duration = 1000;

const isBlending = ref<boolean>(false);
const finishedBlending = ref<boolean>(false);


function initialClick() {
    isBlending.value = true;
    //play an audio of the blender blending 
}
</script>

<style scoped>

</style>
