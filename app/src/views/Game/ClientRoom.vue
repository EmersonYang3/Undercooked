<template>
    <SpecialKey />
</template>

<script setup lang="ts">
import SpecialKey from '@/components/Client/SpecialKey.vue'
import { useSocketStore } from '@/stores/SocketStore'
import { holdableItem } from '@shared/types'
import { ref } from 'vue'

const socketStore = useSocketStore()
const serverToSharedRemotes = socketStore.SharedRemotes
const setItemRemote = serverToSharedRemotes.ToAny.setCurrentItem

const currentHoldableItem = ref<holdableItem | null>(null)

function init() {
    socketStore.removeAllEventListeners()

    console.log("Attaching event listener for receiving new holdable items from server...")

    socketStore.attachEventListener(setItemRemote, (newHoldableItem: holdableItem) => {
        console.log("Received new holdable item from server: ", newHoldableItem)
        currentHoldableItem.value = newHoldableItem
    })
}

init()

</script>