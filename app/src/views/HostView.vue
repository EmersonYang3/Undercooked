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
        <h3 class="text-lg font-semibold text-gray-700">Players Joined: {{ players.length }}</h3>
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

  </div>
</template>

<script setup lang="ts">
import { AuthData, socketStore } from "@/stores/sockets";
import { ref } from "vue";

// Reactive State
const customCode = ref("");
const roomCode = ref("");
const isHosting = ref(false);

// Fake player list (replace with your real data source)
const players = ref([]);
let hostSocket = socketStore();
// Generate a random 5-letter code
function generateRandomCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  return code;
}

// Placeholder navigation for waiting room
function goToWaitingRoom(room: string) {
  console.log("Navigating to waiting room:", room);
  // Replace with:
  // router.push(`/lobby/${room}`);
}
function connect() {
  
}

// Host game and enter waiting room
function startHosting() {
  roomCode.value = customCode.value.trim() || roomCode.value || generateRandomCode();
  let auth:AuthData = {
    intendedRole: "host",
    lobbyCode: roomCode.value,
  }
  hostSocket.createSocket(auth);
  
  isHosting.value = true;

  // Placeholder navigation
  goToWaitingRoom(roomCode.value);
  // In a real implementation:
  // createRoom(roomCode.value);
}

// When host starts the game
function startGame() {
  console.log("Game starting with players:", players.value);
  
}
</script>

<style scoped>
</style>
