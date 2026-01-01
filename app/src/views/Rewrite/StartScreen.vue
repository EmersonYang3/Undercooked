<template>
    <div v-if="!joining">
        <button @click="route('host')">Host Game</button>
        <button @click="joining = true">Join Game</button>
    </div>
    <div v-else>
        <button @click="route('station')">Join as Station</button>
        <button @click="route('player')">Join as Player</button>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
const joining = ref(false);

function route(path: string) {
    router.push(`/${path}`)
}

</script>

<style scoped>

</style>