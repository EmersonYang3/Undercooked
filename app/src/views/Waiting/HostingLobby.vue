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
import CodeArea from '@/components/Waiting/CodeArea.vue'
import RequestNotif from '@/components/Waiting/RequestNotif.vue'
import DecisionButton from '@/components/Shared/DecisionButton.vue'
import { useHostStore } from '@/stores/rewrite/roleStores'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'

const hostStore = useHostStore()

function startGame() { console.log("Starting Game...") }
</script>