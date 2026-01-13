<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
    <DecisionButton text="HOST LOBBY" @on-click="onHostLobby"/>
</template>

<script setup lang="ts">
import CodeInput from './CodeInput.vue'
import DecisionButton from './DecisionButton.vue'
import { useJoiningStore } from '@/stores/JoiningStore'

const joiningStore = useJoiningStore()
const events = defineEmits(['go-back'])

function onBackButton() { events('go-back') }

function onHostLobby() {
    joiningStore.attemptJoinLobby('ABCDEFGHIJKLMNOP', 'host')
}
</script>