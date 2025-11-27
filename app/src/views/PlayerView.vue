<template>
  <div class="w-full flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">

    <!-- ENTER CODE SCREEN -->
    <div
      v-if="!isJoining"
      class="bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center space-y-5"
    >
      <h2 class="text-2xl font-bold">Enter Game Code</h2>

      <input
        v-model="code"
        type="text"
        maxlength="6"
        placeholder="ABC123"
        class="w-full px-4 py-2 rounded-lg text-black text-center text-lg tracking-widest 
               font-semibold uppercase border border-gray-300 focus:outline-none 
               focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="handleJoin"
        class="w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-lg text-lg font-semibold"
      >
        Join Game
      </button>
    </div>

    <!-- WAITING SCREEN -->
    <div
      v-else
      class="bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center space-y-5"
    >
      <h2 class="text-2xl font-bold">Waiting for Host...</h2>
      <p class="text-gray-300">Connected to lobby <span class="font-bold">{{ code }}</span></p>

      <div class="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { PlayerStore, usePlayerStore } from '@/stores/sockets';
import { io, Socket } from 'socket.io-client';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { onEvents } from '@/utils/utils';
import { playerEventFactory } from '@/connections/player/playerEvents';
let player:null | PlayerStore = usePlayerStore();
let socket: Socket | null = null;

const code = ref("");
const isJoining = ref(false);
function handleJoin() {
    if (!code.value.trim()) return;
    joinLobby(code.value);


    isJoining.value = true;
}
function joinLobby(code: string) {
    
    console.log("Joining lobby:", code);
}

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