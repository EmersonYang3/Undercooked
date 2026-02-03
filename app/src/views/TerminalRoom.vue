<template>
    <WaitingArea v-if="isWaiting"></WaitingArea>
    <div v-else>
        <div>
            <!-- this will be in a corner on the top -->
            Held Item: {{ gameStore.heldItem }}
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

import { StationType } from '@/stores/rewrite/roleStores';
import { useSocketStore } from '@/stores/SocketStore';
import { componentMap } from '@/utils/componentMap';
import { Component, ref} from 'vue';
import sharedEnums from '@shared/enums';
import { useGameStore } from '@/stores/Shared/PlayerStore';
import { holdableItem } from '@shared/types';
const socketStore = useSocketStore();
const gameStore = useGameStore();
const isWaiting = ref<boolean>(true);
let selectedComponent: null | Component = null;
socketStore.attachEventListener(sharedEnums.sharedRemotes.setCurrentItem, 
    (item: holdableItem) => {
        gameStore.setItem(item);
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.gameStarted, 
    (keys: Set<string>) => {
        gameStore.setClientKeys(keys);
        isWaiting.value = false;
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.stationAssigned, (stationName: StationType) => {
    
    selectedComponent =  componentMap[stationName];
});



//fetches the specific station Gameplay Comp to be shown
</script>

<style scoped>

</style>