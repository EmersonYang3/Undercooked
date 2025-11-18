<template>
  <div>
    Test
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/sockets';
import { onMounted } from 'vue';

const socket = useChatStore();
onMounted(() => {
  socket.initSocket();
})
function send() {
  
}


</script>

<style scoped>

</style>