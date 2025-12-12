<template>
  <JoinGame v-if="waiting" role="client" @start="test"></JoinGame>
</template>

<script setup lang="ts">

import JoinGame from '@/components/JoinGame.vue';
import { ref } from 'vue';
const waiting = ref(true);
function test() {
  waiting.value = false;
}

</script>

<style scoped>

</style>