<template>
    <div v-if="!store.heldItem">
        <div v-if="store.heldItem.isPlated">
            <img class="pixel-art"  :src="ImageLut['plate']">
        </div>
        <div v-for="value in store.heldItem.foodItems">
            {{value.name}}
            <img class="pixel-art" :src="ImageLut[value.name]">
        </div>
    </div>
    <div>
        No item present
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore, useTerminalStore } from '@/stores/rewrite/roleStores';
import { ImageLut } from '@/utils/ImageLut';
let store = null;
const props = defineProps<{role: "client" | "terminal"}>();
if (props.role == "client") {
    store = usePlayerStore();
} else if (props.role == "terminal") {
    store = useTerminalStore();
}
</script>
<style scoped>
.pixel-art {
  image-rendering: pixelated;
  image-rendering: crisp-edges; /* fallback */
}

</style>