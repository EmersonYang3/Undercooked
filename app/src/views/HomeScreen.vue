<template>
    <Deciding v-if="currentView === 'Deciding'" @decision-event="onDecisionEvent"/>
    <JoinLobby v-else-if="currentView === 'JoinLobby'" @go-back="onBackButton"/>
    <HostLobby v-else-if="currentView === 'HostLobby'" @go-back="onBackButton"/>
</template>

<script setup lang="ts">
import Deciding from "@/components/Home/DecidingComp.vue"
import JoinLobby from "@/components/Home/JoinLobby.vue"
import HostLobby from "@/components/Home/HostLobby.vue"

import { ref } from "vue"

const currentView = ref("Deciding")

function onDecisionEvent(where: string) { currentView.value = where }
function onBackButton() { currentView.value = "Deciding" }
</script>