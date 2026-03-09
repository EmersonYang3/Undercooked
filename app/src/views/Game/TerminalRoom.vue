<template>
    <div>
        <component 
            v-if="visible" 
            :is="selectedComponent"  
            :items="items"  
            @completed="completedGame"
        ></component>
    </div>
</template>

<script setup lang="ts">
import KeyBindService from '@/services/KeyBindService';
import { useStationStore } from '@/stores/Roles/StationStore';
import { useSocketStore } from '@/stores/SocketStore';
import { dynamicComponentsMap, staticComponentsMap } from '@/utils/componentMap';
import sharedEnums from '@shared/enums';
import { holdableItem } from '@shared/types';
import { Component, onMounted, onUnmounted, ref } from 'vue';


const stationStore = useStationStore();
const stationRole = stationStore.getStationRole();
const socketStore = useSocketStore();
const items = ref<holdableItem | null>(null);

const staticComp = ref<boolean>(false);
// Controls visibility for the component if its dynamic
const visible = ref<boolean>(false);
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
/* Only fires on dynamicComponents */
function completedGame() {
    visible.value = false;
    KeyBindService.SetSpecialKeyListenFlag(true);
    
}
function triggerGamplay() {
    //Haven't tested this so it might have unexpected behavior.
    KeyBindService.SetSpecialKeyListenFlag(false);
    //Don't do anything as the component is already visible 
    if (staticComp.value) return;
}

onMounted(()=> {    
    let keys = Object.keys(staticComponentsMap);
    if (keys.includes(stationRole)) {
        staticComp.value = true;
        visible.value = true;
        selectedComponent.value = staticComponentsMap[stationRole] 
    } else {
        selectedComponent.value = dynamicComponentsMap[stationRole]
    }
    KeyBindService.SetSpecialKeyListenFlag(true);
    KeyBindService.OnKeyHeldDown(" ", triggerGamplay);
})
onUnmounted(() => {
    socketStore.removeAllEventListeners();
})
</script>