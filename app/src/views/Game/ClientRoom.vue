<template>
    <WaitingArea v-if="!playerStore.isActive"></WaitingArea>
    <div v-else>
        Your client key: {{ playerStore.key }}
        Held Item: {{ playerStore.heldItem }}
        <img :src="'placeholder'">
    </div>
</template>

<script setup lang="ts">
import WaitingArea from '@/components/Home/WaitingArea.vue';
import { usePlayerStore } from '@/stores/rewrite/roleStores';
const playerStore = usePlayerStore();
</script>

<style scoped>

</style>