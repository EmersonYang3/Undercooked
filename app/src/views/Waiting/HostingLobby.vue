<template>
    <p> ~ HOSTING LOBBY ~ </p>

    <CodeArea />
    <RequestNotif />
    <UniqueIdentifier />
    <div>Current station count: {{ numberOfStations }}</div>
    <div>Current player count: {{ numberOfPlayers }}</div>
    <DecisionButton text="START GAME" @on-click="startGame" />
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore'
import { useSocketStore } from '@/stores/SocketStore'
import { uniqueIdentifier } from '@shared/types'
import { ref } from 'vue'

import CodeArea from '@/components/Waiting/CodeArea.vue'
import RequestNotif from '@/components/Waiting/RequestNotif.vue'
import DecisionButton from '@/components/Shared/DecisionButton.vue'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'

const socketStore = useSocketStore()
const notificationStore = useNotificationStore()

const fromServerToHostRemotes = socketStore.FromServerRemotes.ToHost
const notificationHandlerKeys = notificationStore.HANDLER_KEYS

const numberOfPlayers = ref(0)
const numberOfStations = ref(0)

function listenForPlayersPendingJoin() {
    socketStore.attachEventListener(fromServerToHostRemotes.clientPendingJoin, (identifier: uniqueIdentifier) => {
        notificationStore.addNotification({
            message: `Player with ID ${identifier} is requesting to join your lobby.`,
            options: [{"optionText": "ACCEPT", handlerKey: notificationHandlerKeys.ACCEPT_CLIENT}],
            callbackParameters: { clientIdentifier: identifier }
        })
    })

    socketStore.attachEventListener(fromServerToHostRemotes.stationPendingJoin, (identifier: uniqueIdentifier) => {
        notificationStore.addNotification({
            message: `Station with ID ${identifier} is requesting to join your lobby.`,
            options: [{"optionText": "ACCEPT", handlerKey: notificationHandlerKeys.ACCEPT_STATION}],
            callbackParameters: { stationIdentifier: identifier }
        })
    })
}

function listenForPlayersJoined() {
    socketStore.attachEventListener(fromServerToHostRemotes.newClientJoined, () => {
        numberOfPlayers.value += 1
    })

    socketStore.attachEventListener(fromServerToHostRemotes.newStationJoined, () => {
        numberOfStations.value += 1
    })
}

function removeListenersForPlayersPendingJoin() {
    socketStore.removeEventListener(fromServerToHostRemotes.clientPendingJoin)
    socketStore.removeEventListener(fromServerToHostRemotes.stationPendingJoin)
}

function removeListenersForPlayersJoined() {
    socketStore.removeEventListener(fromServerToHostRemotes.newClientJoined)
    socketStore.removeEventListener(fromServerToHostRemotes.newStationJoined)
}

function startGame() {
    removeListenersForPlayersPendingJoin() 
    removeListenersForPlayersJoined()
    console.log("Starting Game...") 
}

listenForPlayersPendingJoin()
listenForPlayersJoined()

</script>