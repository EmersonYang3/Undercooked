<template>
    <CodeArea />
    <RequestNotif />
    <div>Amount of players : {{ hostStore.players.length }}</div>
    <div>Amount of stations: {{ hostStore.stations.length }}</div>
</template>

<script setup lang="ts">
import CodeArea from '@/components/Waiting/CodeArea.vue';
import RequestNotif from '@/components/Waiting/RequestNotif.vue';
import { useHostStore } from '@/stores/rewrite/roleStores';
const hostStore = useHostStore();

</script>