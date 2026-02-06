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
                Press your client key to start the game
            </div>
            <component v-else :is="selectedComponent" @completed=""></component>
        </div>``
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
import { createKeyTracker } from '@/components/Stations/eventListener';
import type { KeyTracker } from '@/components/Stations/eventListener';
const socketStore = useSocketStore();
const socket = socketStore.socket;
const gameStore = useGameStore();
const isWaiting = ref<boolean>(true);
const clientKeys = ref<Set<string> | null>(null);
let keyListener: null | KeyTracker = null;
let selectedComponent: null | Component = null;

const startedGame = ref<boolean | null>(null);


socketStore.attachEventListener(sharedEnums.sharedRemotes.setCurrentItem, 
    (item: holdableItem) => {
        gameStore.setItem(item);
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.gameStarted, 
    (keys: Set<string>) => {
        gameStore.setClientKeys(keys);
        clientKeys.value = keys;
        isWaiting.value = false;
        keyListener = createKeyTracker(keys, attemptAction);
    }
);
socketStore.attachEventListener(sharedEnums.serverToStationRemotes.stationAssigned, 
    (stationName: StationType) => {
        selectedComponent =  componentMap[stationName];
    }
);
//wait for the backend to emit an event to allow the component to be accessed. the item itself cannot be accessed however until the game is over as the state
function attemptAction(key: string) {
    socket.emit("specialKeyPressed", );
}
function startGame() {

}
function finishedgameplay() {
    //destroy the gampleay component or make it inaccessible
    //
    startedGame.value = true;
}


//fetches the specific station Gameplay Comp to be shown
</script>
