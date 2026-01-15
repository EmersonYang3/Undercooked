<template>
    <input v-model="" maxlength="6" @input="" placeholder="Enter Lobby Code" />
</template>

<script setup lang="ts">
import { ref } from "vue"

import { useLobbyCodeStore } from "@/stores/LobbyCOde";


// function validateCode() { lobbyCode.value = lobbyCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "") }

</script>