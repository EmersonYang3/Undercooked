<template>
    <p> ~Waiting Room~ </p>
    <p> Wait for host approval! </p>
    <CodeArea />
    <UniqueIdentifier />
</template>

<script setup lang="ts">
import CodeArea from '@/components/Waiting/CodeArea.vue'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'
import { useSocketStore } from '@/stores/SocketStore';
import { useRouter } from 'vue-router';

import sharedEnums from "@shared/enums"
import { useClientStore } from '@/stores/Roles/ClientStore';
import { useStationStore } from '@/stores/Roles/StationStore';
const gameRoles = sharedEnums.gameRoles

const router = useRouter()

const socketStore = useSocketStore()
const clientStore = useClientStore()
const stationStore = useStationStore()
socketStore.removeAllEventListeners()

const currentGameRole: string = socketStore.getGameRole()
const isJoiningAsClient = currentGameRole === gameRoles.client
const fromServerEvents = socketStore.FromServerRemotes

function disconnectHostApproval() {
    socketStore.removeEventListener(fromServerEvents.ToClient.clientAccepted)
    socketStore.removeEventListener(fromServerEvents.ToStation.stationAssigned)
}

function onAnyApproved() {
    disconnectHostApproval()
    router.push({ name: "ApprovedRoom" })
}

function connectHostApproval() {
    if (isJoiningAsClient) {
        socketStore.attachEventListener(fromServerEvents.ToClient.clientAccepted, (specialKey: string) => {
            clientStore.setSpecialKey(specialKey)
            onAnyApproved() 
        })
    } else {
        socketStore.attachEventListener(fromServerEvents.ToStation.stationAssigned, (stationType: string) => {
            stationStore.setStationRole(stationType)

            console.log("Station assigned: " + stationType)
            onAnyApproved()
        })
    }
}

connectHostApproval()
</script>