<template>
  <div class="w-full max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
    
    <!-- CREATE LOBBY -->
    <div v-if="!isHosting" class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">Create a Game Lobby</h2>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700 font-medium">Enter a Room Code (optional):</label>
        <input
          v-model="customCode"
          placeholder="e.g. ABC123"
          class="border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      <div class="flex space-x-3">
        <button
          @click="customCode = generateRandomCode()"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Generate Code
        </button>

        <button
          @click="startHosting"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Host Game
        </button>
      </div>
    </div>

    <!-- WAITING ROOM -->
    <div v-else class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">
        Lobby Code: <strong class="text-blue-600">{{ roomCode }}</strong>
      </h2>

      <p class="text-gray-600">Share this code with players to join.</p>

      <div>
        <h3 class="text-lg font-semibold text-gray-700">Players Joined: {{ hostStore.players.length + hostStore.stations.length }}</h3>
        <ul class="mt-2 space-y-1">
          <li
            v-for="player in players"
            :key="player.id"
            class="bg-gray-100 px-3 py-1 rounded-md text-gray-800"
          >
            {{ player.name }}
          </li>
        </ul>
      </div>

      <button
        :disabled="players.length < 1"
        @click="startGame"
        class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 transition"
      >
        Start Game
      </button>
    </div>
    <RequestNotif></RequestNotif>
  </div>
</template>

<script setup lang="ts">
import { useSocketStore } from "@/stores/sockets";
import { useHostStore } from "@/stores/roleStores";
import { ref } from "vue";
import RequestNotif from "@/components/RequestNotif.vue";
import type { handshakeData } from "@shared/types";
const customCode = ref("");
const roomCode = ref("");
const isHosting = ref(false);

const players = ref([]);
let socketStore = useSocketStore();
let hostStore = useHostStore();

function generateRandomCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  return code;
}
function goToWaitingRoom(room: string) {
  console.log("Navigating to waiting room:", room);
}
enum gameRoles {
    host = 'host',
    client = 'client',
    station = 'station'
}
function startHosting() {
  roomCode.value = customCode.value.trim() || roomCode.value || generateRandomCode();
  let auth:handshakeData = {
    intendedRole: gameRoles.host,
    lobbyCode: roomCode.value,
  }
  socketStore.createSocket(auth, hostStore);
  isHosting.value = true;
  goToWaitingRoom(roomCode.value);
}

// When host starts the game
function startGame() {
  console.log("Game starting with players:", players.value);
  
}
</script>

<style scoped>
</style>
