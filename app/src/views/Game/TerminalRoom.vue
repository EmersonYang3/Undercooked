<template>
    <WaitingArea v-if="!terminalStore.isActive"></WaitingArea>
    <div v-else>
        <div>
            <!-- this will be in a corner on the top -->
            Held Item: {{ terminalStore.heldItem }}
            <img :src="'placeholder'">
        </div>
        <!-- gameplay component that is attached via a look up table -->
        <component v-if="selectedComponent" :is="selectedComponent"></component>
        <div v-else>
            Station type was not set. Unable to find a suitable gameplay component
        </div>
    </div>
</template>

<script setup lang="ts">
import WaitingArea from '@/components/Home/WaitingArea.vue';

import { useTerminalStore } from '@/stores/rewrite/roleStores';
import { componentMap } from '@/utils/componentMap';
import { computed } from 'vue';

const terminalStore = useTerminalStore();
//fetches the specific station Gameplay Comp to be shown
const selectedComponent = computed(() => {
  return componentMap[terminalStore.station]
})
</script>

<style scoped>

</style>