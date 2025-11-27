<template>
    <div v-if="!player.isPlaying">
        <!-- waiting screen here -->
        Enter Game Code
        <input type="text"></input>
    </div>
    <div>
        {{ player.inventory }}
    </div>
</template>

<script setup lang="ts">
import { PlayerStore, usePlayerStore } from '@/stores/sockets';
import { io, Socket } from 'socket.io-client';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { onEvents } from '@/utils/utils';
import { playerEventFactory } from '@/connections/player/playerEvents';
let player:null | PlayerStore = usePlayerStore();
let socket: Socket | null = null;
//put the waiting screen
function startGame() {
    if (socket) {
        socket.disconnect();
        socket.removeAllListeners();
    }

    const authData = { auth: { intendedRole: 'host', lobbyCode: "ABCDEF" } }
    socket = io(`http://localhost:3000`, {
        ...authData,
        autoConnect: false,
    });

    const playerEvents = playerEventFactory(player);
    onEvents(socket, playerEvents);
    socket.connect();
}
onMounted(() => {
    startGame();
})
function endGame() {
    player = usePlayerStore();
    //unsure if i should reset the store entirely or keep reusing it

    //reset the player store state here
}
watch(() => player.isPlaying, (playing) => {
    if (playing) startGame();
    else endGame();
});
onBeforeUnmount(() => {
    socket?.disconnect();
})
</script>

<style scoped>

</style>