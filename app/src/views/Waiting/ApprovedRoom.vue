<template>
    <p> ~ Approved Room ~</p>
    <p> You are approved to join the game. </p>
    <p> Wait until the host starts the game.</p>

    <UniqueIdentifier />

    <div v-if="isCurrentlyClient">
        <p> You are a client in this room. </p>
        <p> Your special client key is {{ clientSpecialKey }}</p>
        <p> Do not share this key with other players. </p>
    </div>

    <div v-else>
        <p> You are a station in this room.</p>
        <p> You are a {{ stationRole }}</p>
    </div>
</template>

<script setup lang="ts">
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue';

import { useSocketStore } from '@/stores/SocketStore';
import { useClientStore } from '@/stores/Roles/ClientStore';
import { useStationStore } from '@/stores/Roles/StationStore';
import { useRouter } from 'vue-router';

import KeyBindService from '@/services/KeyBindService';

const socketStore = useSocketStore()
const router = useRouter()

const clientStore = useClientStore()
const stationStore = useStationStore()

const stationRole = stationStore.getStationRole()


const isCurrentlyClient = socketStore.getIsClient()
const clientSpecialKey = isCurrentlyClient ? clientStore.specialKey : "NO CLIENT SPECIAL KEY"

console.log(isCurrentlyClient)

const fromServerRemotes = socketStore.FromServerRemotes

function listenForGameStarted() {
    if (isCurrentlyClient) {
        socketStore.attachEventListener(fromServerRemotes.ToClient.gameStarted, function() {
            console.log("Game has started! Transitioning to game screen maybe...")
            router.push({ name: "ClientRoom" })
        })
    } else {
        socketStore.attachEventListener(fromServerRemotes.ToStation.gameStarted, (clientSpecialKeys: string[]) => {
            KeyBindService.RegisterSpecialKeys(clientSpecialKeys)
            router.push({ name: "TerminalRoom" })
            
            console.log("Game has started! Transitioning to game screen maybe...")
            console.log(clientSpecialKeys)
        })
    }
}

listenForGameStarted()
</script>