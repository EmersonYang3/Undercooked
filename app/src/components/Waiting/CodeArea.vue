<template>
    <p>{{ code }}</p>
</template>

<script lang="ts" setup>
import { useLobbyCodeStore } from '@/stores/LobbyCode'

const lobbyCodeStore = useLobbyCodeStore()
const code = lobbyCodeStore.lobbyCode
</script>