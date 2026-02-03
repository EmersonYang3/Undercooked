<template>
    <p> ~Waiting Room~ </p>
    <p> Wait for host approval! </p>
    <CodeArea />
    <UniqueIdentifier />
</template>

<script setup lang="ts">
import CodeArea from '@/components/Waiting/CodeArea.vue'
import UniqueIdentifier from '@/components/Shared/UniqueIdentifier.vue'
import { useSocketStore } from '@/stores/SocketStore';

import sharedEnums from "@shared/enums"
const gameRoles = sharedEnums.gameRoles

const socketStore = useSocketStore()
socketStore.removeAllEventListeners()

const isJoiningAsClient = socketStore.gameRole === gameRoles.client
const fromServerEvents = socketStore.FromServerRemotes
</script>