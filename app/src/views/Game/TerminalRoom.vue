<template>
    <WaitingArea v-if="isWaiting"></WaitingArea>
    <div v-else>
        <div>
            <!-- this will be in a corner on the top -->
            Held Item: {{ items }}
            <img :src="'placeholder'">
        </div>
        <div v-if="selectedComponent" > 
            <div v-if="!startedGame">
                Press your client key to perform an action
            </div>
            <component 
                v-if="startedGame || isPersistent" 
                :is="selectedComponent" 
                :items="items" 
                :failure="failure"
                @completed="startListening"
            ></component> 
            <!-- The failure prop is for submission to show when the item failed to submit -->
            <!-- The items prop is for the holdableItem. 
                 The logic is handled in the component the prop is paassed into -->
        </div>
        <div v-else>
            Station type was not set. Unable to find a suitable gameplay component
        </div>
    </div>
</template>

<script setup lang="ts">
import WaitingArea from '@/components/Home/WaitingArea.vue';

import sharedEnums from '@shared/enums';
import { holdableItem } from '@shared/types';
import { createSingleClick, SingleClickChecker } from '@/services/KeyBindService';

import { useSocketStore } from '@/stores/SocketStore';

const staticStations = sharedEnums.staticStations;


import { Component, onUnmounted, ref} from 'vue';
import { dynamicComponentsMap, staticComponentsMap } from '@/utils/componentMap';


const socketStore = useSocketStore();

//these are optional 
const items = ref<holdableItem | null>(null);
const failure = ref<boolean>(false);

const clientKeys = ref<Set<string> | null>(null);
const startedGame = ref(false);

const isWaiting = ref<boolean>(true);
const isPersistent = ref<boolean>(false);

let listener: SingleClickChecker | null = null;
const selectedComponent = ref<Component | null>(null);

socketStore.attachEventListener(sharedEnums.sharedRemotes.setCurrentItem, 
    (item: holdableItem) => {
        if (!item || typeof item !== "object") {
            console.error("Invalid item:", item);
            return;
        }
        items.value = item;
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.gameStarted, 
    (keys: Set<string>) => {
        clientKeys.value = keys;
        isWaiting.value = false;
        startListening(keys);
    }
)

socketStore.attachEventListener(sharedEnums.serverToStationRemotes.stationAssigned, 
    (stationName: string) => {
        if (!stationName) {
            throw new Error("No station name was provided. Disconnect and reconnect");
        }
        if (selectedComponent) {
            throw new Error("A station type for this was already set.");
        }
        if (Object.values(staticStations).includes(stationName as any)) {
            isPersistent.value = true;
            selectedComponent.value = staticComponentsMap[stationName];
            return;
        }
        selectedComponent.value = dynamicComponentsMap[stationName];
    }
);

function startListening(keys: Set<string>) {
    if (!selectedComponent.value) {
        throw new Error("There was no selected component put. Cannot route to the apporpiate component")
    }
    if (isPersistent.value) {
        return;
    }
    if (!listener) {
        listener = createSingleClick(keys, socketStore, triggerGameplay);
    };
    listener.arm();
}

function triggerGameplay(some_condition: boolean) {
    if (some_condition) {
        if (isPersistent.value) {
            return;
        }
        startedGame.value = true;
    }    
}
onUnmounted(() => {
    socketStore.removeAllEventListeners();
})
</script>
