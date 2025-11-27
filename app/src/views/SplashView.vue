<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white px-6"
  >
    <h1 class="text-4xl font-extrabold mb-10 text-center drop-shadow">
      Select Your Mode
    </h1>
    <div class="flex flex-col md:flex-row gap-6">

      <!-- Terminal Option -->
      <div
        @click="goTerminal"
        class="cursor-pointer bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 w-64 shadow-lg 
               flex flex-col items-center text-center hover:scale-105 duration-200 border border-gray-600"
      >
        <div class="text-5xl mb-4">🖥️</div>
        <h2 class="text-2xl font-bold">Station</h2>
        <p class="text-gray-300 mt-2 text-sm">Join as a cooking station</p>
      </div>
      <div
        @click="goPlayer"
        class="cursor-pointer bg-blue-600 hover:bg-blue-500 transition rounded-xl p-6 w-64 shadow-lg 
               flex flex-col items-center text-center hover:scale-105 duration-200"
      >
        <div class="text-5xl mb-4">🎮</div>
        <h2 class="text-2xl font-bold">Player</h2>
        <p class="text-blue-100 mt-2 text-sm">Play the game</p>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function goTerminal() {
  router.push("/terminal");
}
function goPlayer() {
  router.push("/player");
}
</script>

<style scoped>

</style>