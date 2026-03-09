<template>
    <p> ~ HOSTING LOBBY ~ </p>

    <CodeArea />
    <UniqueIdentifier />
    <div>Current station count: {{ numberOfStations }}</div>
    <div>Current player count: {{ numberOfPlayers }}</div>

    <DecisionButton text="START GAME" @on-click="startGame" />
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore'
import { useSocketStore } from '@/stores/SocketStore'
import { uniqueIdentifier } from '@shared/types'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import CodeArea from '@/components/Waiting/CodeArea.vue'
import DecisionButton from '@/components/Shared/DecisionButton.vue'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'

const router = useRouter()
const socketStore = useSocketStore()
const notificationStore = useNotificationStore()

const ServerToHostRemotes = socketStore.FromServerRemotes.ToHost
const HostToServerRemotes = socketStore.ToServerRemotes.FromHost
const notificationHandlerKeys = notificationStore.HANDLER_KEYS

const numberOfPlayers = ref(0)
const numberOfStations = ref(0)

function routeToHostRoom() {
    router.push({name: 'HostingRoom'})
}

function listenForPlayersPendingJoin() {
    socketStore.attachEventListener(ServerToHostRemotes.clientPendingJoin, (identifier: uniqueIdentifier) => {
        notificationStore.addNotification({
            message: `Player with ID ${identifier} is requesting to join your lobby.`,
            options: [{"optionText": "ACCEPT", handlerKey: notificationHandlerKeys.ACCEPT_CLIENT}],
            callbackParameters: { clientIdentifier: identifier }
        })
    })

    socketStore.attachEventListener(ServerToHostRemotes.stationPendingJoin, (identifier: uniqueIdentifier) => {
        notificationStore.addNotification({
            message: `Station with ID ${identifier} is requesting to join your lobby.`,
            options: [{"optionText": "ACCEPT", handlerKey: notificationHandlerKeys.ACCEPT_STATION}],
            callbackParameters: { stationIdentifier: identifier }
        })
    })
}

function listenForPlayersJoined() {
    socketStore.attachEventListener(ServerToHostRemotes.newClientJoined, () => {
        numberOfPlayers.value += 1
    })

    socketStore.attachEventListener(ServerToHostRemotes.newStationJoined, () => {
        numberOfStations.value += 1
    })
}

function removeGameStartedListener() {
    socketStore.removeEventListener(ServerToHostRemotes.GAME_STARTED)
}

function listenForGameStarted() {
    socketStore.attachEventListener(ServerToHostRemotes.GAME_STARTED, function() {
        console.log("Game has started! Transitioning to game screen maybe...")

        removeListenersForPlayersPendingJoin() 
        removeListenersForPlayersJoined()
        removeGameStartedListener()

        routeToHostRoom()
    })
}

function removeListenersForPlayersPendingJoin() {
    socketStore.removeEventListener(ServerToHostRemotes.clientPendingJoin)
    socketStore.removeEventListener(ServerToHostRemotes.stationPendingJoin)
}

function removeListenersForPlayersJoined() {
    socketStore.removeEventListener(ServerToHostRemotes.newClientJoined)
    socketStore.removeEventListener(ServerToHostRemotes.newStationJoined)
}

function startGame() {
    socketStore.emitEvent(HostToServerRemotes.startLobby)
    console.log("Starting Game...") 
}w

listenForGameStarted()
listenForPlayersPendingJoin()
listenForPlayersJoined()

</script>