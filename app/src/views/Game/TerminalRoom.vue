<template>
    <WaitingArea v-if="isWaiting"></WaitingArea>
    <div v-else>
        <div>
            <!-- this will be in a corner on the top -->
            Held Item: {{ gameStore.heldItem }}
            <img :src="'placeholder'">
        </div>
        <!-- gameplay component that is attached via a look up table -->
        <div v-if="selectedComponent" > 
            <div v-if="!startedGame">
                Press your client key to perform an action
            </div>
            <component v-if="startedGame || isPersistent" :is="selectedComponent" :items="items" @completed="startListening"></component> 
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
import { createSingleClick, SingleClickChecker } from '@/services/keyHandlers';

import { useGameStore } from '@/stores/Shared/PlayerStore';
import { useSocketStore } from '@/stores/SocketStore';

import { componentMap } from '@/utils/componentMap';
import { Component, ref} from 'vue';

//if a prop is defined its passed in
const items = ref<holdableItem | null>(null);

const socketStore = useSocketStore();
const gameStore = useGameStore();

const isWaiting = ref<boolean>(true);
const clientKeys = ref<Set<string> | null>(null);
const startedGame = ref<boolean | null>(null);

//for when the station is always active regardless of the player action
const isPersistent = ref<boolean>(false);

let listener: SingleClickChecker | null = null;
let selectedComponent: null | Component = null;

socketStore.attachEventListener(sharedEnums.sharedRemotes.setCurrentItem, 
    (item: holdableItem) => {
        gameStore.setItem(item);
        items.value = item;
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.gameStarted, 
    (keys: Set<string>) => {
        gameStore.setClientKeys(keys);
        clientKeys.value = keys;
        isWaiting.value = false;
        startListening(keys);
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.stationAssigned, 
    (stationName: string) => {
        //check if the stationType is a static or dynamic station
        //static stations mean the station doesn't have any gameplay
        //dynamic = gameplay and routes to another component via the key presser
    
        selectedComponent = componentMap[stationName];
    }
);

//Prevents constant recreation of listener by re using the initially created one
//arm() must be called. 
function startListening(keys: Set<string>) {
    if (isPersistent.value) {
        return;
    }
    if (!listener) {
        listener = createSingleClick(keys, socketStore, triggerGameplay);
    };
    listener.arm();
}

//Some condition will be regarding if the item can be used at the station
//Should probably rewrite the backend to return an action enum/string so 
//Theres less logic on the frontend. 
function triggerGameplay(some_condition: boolean) {
    if (some_condition) {
        if (isPersistent.value) {
            return;
            //Don't 
        }
        startedGame.value = true;
    }    
}
</script>
