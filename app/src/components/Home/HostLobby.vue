<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
    <DecisionButton v-if="allowHosting" text="HOST LOBBY" @on-click="onHostLobby"/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CodeInput from './CodeInput.vue'
import DecisionButton from './DecisionButton.vue'
import { useJoiningStore } from '@/stores/JoiningStore'
import { useLobbyCodeStore } from '@/stores/LobbyCode'

const joiningStore = useJoiningStore()
const lobbyCodeStore = useLobbyCodeStore()

const events = defineEmits(['go-back'])
const allowHosting = computed(() => { return lobbyCodeStore.isLobbyCodeValid() })

function onBackButton() { events('go-back') }
function onHostLobby() { joiningStore.attemptJoinLobby('host') }
</script>