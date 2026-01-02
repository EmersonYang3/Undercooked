<template>
    <div>
        Currently Held Item {{ stationStore.currentHelditem }}
        <img src="ImageLut placeholder">
    </div>
</template>

<script setup lang="ts">
import { useTerminalStore } from '@/stores/roleStores';
import { useClientConnection } from './clientKeyPress';
import { useSocketStore } from '@/stores/sockets';
const stationStore = useTerminalStore();
const socket = useSocketStore().getSocket();
let res = useClientConnection(stationStore.clientsKeys, startGame)

function startGame(key: string) {
    socket.emit("specialKeyPressed", stationStore.id, key);
}
function gameState() {

}

function endGame() {

}

</script>

<style scoped>

</style>