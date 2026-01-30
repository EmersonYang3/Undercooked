<template>
    <p>Unqiue Identifier: {{ socketStore.uniqueIdentifier }} </p>
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/SocketStore'

const socketStore = useSocketStore()
</script>