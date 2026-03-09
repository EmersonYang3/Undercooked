<template>
    
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/SocketStore'
import { activeRecipe } from '@shared/types'

const socketStore = useSocketStore()
const serverToHostRemotes = socketStore.FromServerRemotes.ToHost

function connectHostEvents() {
    socketStore.attachEventListener(serverToHostRemotes.NEW_RECIPE, (newRecipe: activeRecipe) => {
        console.log("Received new recipe from server:", newRecipe)
    })
}

function init() {
    connectHostEvents()
}

init()

</script>