<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput @update:code="updateCode"/>
    <DecisionButton text="HOST LOBBY" @on-click="onHostLobby"/>
</template>

<script setup lang="ts">
import CodeInput from './CodeInput.vue'
import DecisionButton from './DecisionButton.vue'
import { useJoiningStore } from '@/stores/JoiningStore'
import { ref } from 'vue'

const joiningStore = useJoiningStore()
const code = ref("")

const events = defineEmits(['go-back'])

function onBackButton() { events('go-back') }
function updateCode(newCode: string) { code.value = newCode }

function onHostLobby() {
    if (code.value.length !== 6) { return }
    joiningStore.attemptJoinLobby(code.value, 'host')
}
</script>