<template>
    <button v-for="(label, role) in availableRoles" :key="role" @click="selectRole(role)">
        {{ label }}
    </button>
</template>

<script setup lang="ts">
import sharedEnums from "@shared/enums"

const gameRoles = sharedEnums.gameRoles
const events = defineEmits<{ (e: 'roleSelected', role: string): void }>();

const availableRoles = {
    [gameRoles.host]: "Host",
    [gameRoles.client]: "Client",
    [gameRoles.station]: "Station"
}

function selectRole(role: string) { events('roleSelected', role) }
</script>