<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-10">

    <div class="w-full max-w-2xl bg-white/95 shadow-2xl rounded-2xl p-10 backdrop-blur">
      
      <!-- HEADER -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">
          Game Lobby Setup
        </h1>
        <p class="text-gray-600 mt-2">Create a room and invite players to join</p>
      </div>

      <!-- CREATE LOBBY -->
      <div v-if="!isHosting" class="space-y-10">
        
        <!-- INPUT SECTION -->
        <div class="space-y-3">
          <label class="text-gray-700 font-semibold text-lg">Room Code (optional)</label>
          <input
            v-model="customCode"
            placeholder="e.g. ABC123"
            class="border border-gray-300 rounded-lg px-4 py-3 text-lg shadow-sm 
                   focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
          />
          <p class="text-sm text-gray-500">
            Leave empty to auto-generate a 6-letter room code.
          </p>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex space-x-4 justify-center">
          <button
            @click="customCode = generateRandomCode()"
            class="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 transition"
          >
            Generate Code
          </button>

          <button
            @click="startHosting"
            class="px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow hover:bg-green-700 transition"
          >
            Host Game
          </button>
        </div>
      </div>

      <!-- WAITING ROOM -->
      <div v-else class="space-y-10">

        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-800">Lobby Ready</h2>
          <p class="text-gray-600 mt-1">Share this code with players</p>

          <div class="mt-4 text-5xl font-extrabold tracking-widest text-blue-700 drop-shadow">
            {{ roomCode }}
          </div>
        </div>

        <!-- PLAYERS LIST CARD -->
        <div class="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-inner">
          <h3 class="text-xl font-bold text-gray-700">
            Players Joined ({{ players.length }})
          </h3>

          <ul class="mt-4 space-y-2">
            <li
              v-for="player in players"
              :key="player.id"
              class="bg-white px-4 py-2 rounded-lg shadow text-gray-800 border border-gray-200"
            >
              {{ player.name }}
            </li>

            <li v-if="players.length === 0" class="text-gray-500 italic">
              Waiting for players…
            </li>
          </ul>
        </div>

        <!-- START GAME BUTTON -->
        <div class="text-center">
          <button
            :disabled="players.length < 1"
            @click="startGame"
            class="px-8 py-3 text-xl font-semibold rounded-lg shadow 
                   bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 transition"
          >
            Start Game
          </button>
        </div>
      </div>
      <RequestNotif></RequestNotif>
    </div>
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
  host = "host",
  client = "client",
  station = "station",
}

function startHosting() {
  roomCode.value = customCode.value.trim() || generateRandomCode();

  let auth: handshakeData = {
    intendedRole: gameRoles.host,
    lobbyCode: roomCode.value,
  };

  socketStore.createSocket(auth, hostStore);
  isHosting.value = true;
  goToWaitingRoom(roomCode.value);
}

function startGame() {
  console.log("Game starting with players:", players.value);
}
</script>

<style scoped>
</style>
