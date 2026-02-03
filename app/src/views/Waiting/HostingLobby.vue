<template>
    <p> ~ HOSTING LOBBY ~ </p>

    <CodeArea />
    <RequestNotif />
    <UniqueIdentifier />
    <div>Current station count :{{ activeStations.length }}</div>
    <div>Current player count : {{ activePlayers.length }}</div>
    <DecisionButton text="START GAME" @on-click="startGame" />
</template>

<script setup lang="ts">
import CodeArea from '@/components/Waiting/CodeArea.vue'
import RequestNotif from '@/components/Waiting/RequestNotif.vue'
import DecisionButton from '@/components/Shared/DecisionButton.vue'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'


import { useSocketStore } from '@/stores/SocketStore'
import enums from '@shared/enums'
import router from '@/router'
import { reactive } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { notificationEntry } from '@/utils/types'
const socketStore = useSocketStore();

const activeStations = reactive([])
const activePlayers = reactive([]);

const notifStore = useNotificationStore();



//this could become another store if we want to maintain player count and shw it across components
socketStore.attachEventListener(enums.serverToHostRemotes.clientPendingJoin, (identifier: { identifier: number }) => {
    let notifEntry: notificationEntry = {
        message: "Accept player",
        options: {
            "accept": "player",
            "decline": "player"
        }
    };
    notifStore.addNotification(notifEntry);

    //message store gets sent the message with config opts
})
socketStore.attachEventListener(enums.serverToHostRemotes.newClientJoined, (client: number) => {
    activePlayers.push(client)
})
socketStore.attachEventListener(enums.serverToHostRemotes.stationPendingJoin, (identifier: { identifier: number }) => {
    let notifEntry: notificationEntry = {
        message: "Accept station",
        options: {
            "accept": "station",
            "decline": "station"
        },
    };
    notifStore.addNotification(notifEntry);
    //attached callback function emits to the backend
    //the backend then sends back the newStationJoined stuff and whatnot
})

socketStore.attachEventListener(enums.serverToHostRemotes.newStationJoined, (stations: number) => {
    activeStations.push(stations)
})



function startGame() { 
    console.log("Starting Game...") 
    //clean everything up first before going 
    socketStore.removeAllEventListeners();
    router.push('/host');
}
</script>