<template>
    <p> ~Waiting Room~ </p>
    <p> Wait for host approval! </p>
    <CodeArea />
</template>

<script setup lang="ts">
import CodeArea from '@/components/Waiting/CodeArea.vue'
import { useSocketStore } from '@/stores/SocketStore';

import sharedEnums from "@shared/enums"
const gameRoles = sharedEnums.gameRoles

const socketStore = useSocketStore()
socketStore.removeAllEventListeners()

const isJoiningAsClient = socketStore.gameRole === gameRoles.client
const fromServerEvents = socketStore.FromServerRemotes

if (isJoiningAsClient) {
    socketStore.attachEventListener(fromServerEvents.ToClient.clientAccepted, function() {
        console.log("Client has been accepted into the lobby!");
    })
} else {
    socketStore.attachEventListener(fromServerEvents.ToStation.stationAssigned, function() {
        console.log("Station has been assigned to the host!");
    })
}
</script>