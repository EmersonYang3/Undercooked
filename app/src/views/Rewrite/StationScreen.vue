<template>
    <JoinScreen v-if="!gameStarted" @start="gameStarted = true" role="station"></JoinScreen>
    <div v-else>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JoinScreen from './JoinScreen.vue';
const gameStarted = ref(false);
function route() {
    
}

</script>

<style scoped>

</style>