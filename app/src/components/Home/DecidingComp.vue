<template>
    <button @click="joinLobby">Join Da Lobby</button>
    <button @click="hostLobby">Host Da Lobby</button>
</template>

<script setup lang="ts">
const events = defineEmits<{ (e: 'decisionEvent', where: string): void}>()

function joinLobby() { events('decisionEvent', 'JoinLobby') }
function hostLobby() { events('decisionEvent', 'HostLobby') }
</script>