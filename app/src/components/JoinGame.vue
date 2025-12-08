<template>
  <div class="w-full flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">

    <!-- ENTER CODE SCREEN -->
    <div
      v-if="!isJoining"
      class="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6 border border-gray-700"
    >
      <h2 class="text-3xl font-bold tracking-wide">Enter Game Code</h2>

      <input
        v-model="code"
        @input="formatCode"
        type="text"
        placeholder="ABC123"
        class="w-full px-4 py-3 rounded-lg text-black text-center text-2xl tracking-[0.35em]
               font-bold uppercase border border-gray-300 bg-gray-100
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="handleJoin"
        :disabled="code.length !== 6"
        class="w-full py-3 rounded-lg text-lg font-semibold transition
               bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Join Game
      </button>
    </div>

    <!-- WAITING SCREEN -->
    <div
      v-else
      class="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6 border border-gray-700"
    >
      <h2 class="text-3xl font-bold tracking-wide">Waiting for Host...</h2>

      <p class="text-gray-300 text-lg">
        Connected to lobby <span class="font-bold">{{ code }}</span>
      </p>

      <div class="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { PlayerStore, usePlayerStore, useTerminalStore } from '@/stores/roleStores';
import { Socket } from 'socket.io-client';
import { ref, watch } from 'vue';
import { useSocketStore } from '@/stores/sockets';

const emit = defineEmits(["start"]);

const props = defineProps<{
  role: "client" | "station"
}>()

const store = props.role === "client"
  ? usePlayerStore()
  : useTerminalStore();

const socketStore = useSocketStore();
let socket: Socket | null = null;

const code = ref("");
const isJoining = ref(false);

/** Format input: uppercase + alphanumeric only + limit 6 chars */
function formatCode() {
  code.value = code.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
}
function handleJoin() {
  if (code.value.length !== 6) return;
  isJoining.value = true;
  joinLobby(code.value);
}
function joinLobby(lobbyCode: string) {
  const auth = {
    intendedRole: props.role,
    lobbyCode,
  };
  socket = socketStore.createSocket(auth, store);
}
watch(() => store.isReady, (ready) => {
  console.log("isReady changed:", ready)
  emit("start");
})
</script>

<style scoped></style>
