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
import { PlayerStore, usePlayerStore } from '@/stores/roleStores';
import { Socket } from 'socket.io-client';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useSocketStore } from '@/stores/sockets';
import { handshakeData } from '@shared/types';
let playerStore = usePlayerStore();
let socketStore = useSocketStore();
let socket: null | Socket = null;
const code = ref("");
const isJoining = ref(false);
function handleJoin() {
    if (!code.value.trim()) return;
    let success = joinLobby(code.value);
    if(success) {
      isJoining.value = success;
    } else {
      failedToJoin();
    }
}
function failedToJoin() {
  console.log("failed to join?")
  //modifies the v-if div portion to show a failure message or smth
}
function joinLobby(code: string):boolean {
    console.log(code);
    let auth:handshakeData = {
      intendedRole: "client",
      lobbyCode: code,
    }
    socket = socketStore.createSocket(auth, playerStore);
    return playerStore.isReady;
}
</script>

<style scoped>

</style>