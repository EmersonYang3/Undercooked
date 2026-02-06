<template>
    <p> ~ HOSTING LOBBY ~ </p>

    <CodeArea />
    <RequestNotif />
    <UniqueIdentifier />

    <!-- <div>Amount of players : {{ hostStore.players.length }}</div>
    <div>Amount of stations: {{ hostStore.stations.length }}</div> -->

    <DecisionButton text="START GAME" @on-click="startGame" />
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore'
import { useSocketStore } from '@/stores/SocketStore'
import { uniqueIdentifier } from '@shared/types'

import CodeArea from '@/components/Waiting/CodeArea.vue'
import RequestNotif from '@/components/Waiting/RequestNotif.vue'
import DecisionButton from '@/components/Shared/DecisionButton.vue'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'

const socketStore = useSocketStore()
const notificationStore = useNotificationStore()

const fromServerToHostRemotes = socketStore.FromServerRemotes.ToHost
const notificationHandlerKeys = notificationStore.HANDLER_KEYS

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

// TODO: Implement these listeners properly
function listenForPlayersJoined() {
    socketStore.attachEventListener(fromServerToHostRemotes.newClientJoined, () => {})
    socketStore.attachEventListener(fromServerToHostRemotes.newStationJoined, () => {})
}

function removeListenersForPlayersPendingJoin() {
    socketStore.removeEventListener(fromServerToHostRemotes.clientPendingJoin)
    socketStore.removeEventListener(fromServerToHostRemotes.stationPendingJoin)
}

function startGame() {
    removeListenersForPlayersPendingJoin() 
    console.log("Starting Game...") 
}

listenForPlayersPendingJoin()
</script>