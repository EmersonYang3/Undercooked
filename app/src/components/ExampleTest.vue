<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useSocketStore } from '@/stores/sockets';
import { watch } from 'vue';
const socketStore = useSocketStore();
socketStore.connect("player");
//example of checking what player the station has moved to
function start() {
    
}

watch(() => socketStore.currentStation, (s) => {
    console.log("player moved to station:", s);
})
watch(() => socketStore.start, () => {

})
</script>

<style scoped>

</style>