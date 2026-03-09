<template>

</template>

<script setup lang="ts">
import { useStationStore } from '@/stores/Roles/StationStore'

const stationStore = useStationStore()
const stationType = stationStore.getStationRole()

console.warn(stationType)
</script>