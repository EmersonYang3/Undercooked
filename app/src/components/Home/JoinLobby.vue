<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
    <RolePicker @role-selected="onRoleSelected"/>
    <DecisionButton text="JOIN LOBBY" @on-click="onJoingLobby" v-if="allowJoinLobby"/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useJoiningStore } from '@/stores/JoiningStore'
import { useLobbyCodeStore } from "@/stores/LobbyCode"
import { intendedRoles } from "@shared/types"

import CodeInput from './CodeInput.vue'
import RolePicker from './RolePicker.vue'
import sharedEnums from "@shared/enums"
import DecisionButton from "./DecisionButton.vue"

const joiningStore = useJoiningStore()
const lobbyCodeStore = useLobbyCodeStore()
const roleEnums = sharedEnums.gameRoles

const events = defineEmits(['go-back'])
const roleRef = ref<intendedRoles>(roleEnums.client)
const allowJoinLobby = computed(() => lobbyCodeStore.isLobbyCodeValid())

function onBackButton() { events('go-back') }
function onRoleSelected(role: intendedRoles) { roleRef.value = role }
function onJoingLobby() { joiningStore.attemptJoinLobby(roleRef.value) }
</script>