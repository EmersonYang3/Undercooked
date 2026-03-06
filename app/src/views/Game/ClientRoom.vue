<template>
    <WaitingArea v-if="isWaiting"></WaitingArea>
    <div v-else>
        Your client key: 
        Held Item: {{ gameStore.heldItem }}
        <img :src="'placeholder'">
    </div>
</template>

<script setup lang="ts">
import WaitingArea from '@/components/Home/WaitingArea.vue';
import { useClientStore } from '@/stores/Roles/ClientStore';
import { useGameStore } from '@/stores/Shared/PlayerStore';
import { useSocketStore } from '@/stores/SocketStore';
import sharedEnums from '@shared/enums';
import { holdableItem } from '@shared/types';
import { ref } from 'vue';
const clientKey = ref<null | string>(null);

    const isWaiting = ref(true);
const gameStore = useGameStore();
const socketStore = useSocketStore();
socketStore.attachEventListener(sharedEnums.serverToClientRemotes.gameStarted, (key: string) => {
    clientKey.value = key;
    isWaiting.value = false;
})
socketStore.attachEventListener(sharedEnums.serverToClientRemotes.pendingJoin, () => {
    console.log("Identifier", )
})
socketStore.attachEventListener(sharedEnums.sharedRemotes.setCurrentItem, (item: holdableItem) => {
    gameStore.setItem(item);
})
</script>

<style scoped>

</style>