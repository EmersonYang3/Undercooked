<template>
    <input v-model="code" maxlength="6" @input="onCodeInput" placeholder="Enter Lobby Code" />
</template>

<script setup lang="ts">
import { ref } from "vue"

import { useLobbyCodeStore } from "@/stores/LobbyCode"
const lobbyCodeStore = useLobbyCodeStore()

const code = ref("")

lobbyCodeStore.setLobbyCode(code.value)

function onCodeInput() {
    code.value = code.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    lobbyCodeStore.setLobbyCode(code.value)
}

</script>