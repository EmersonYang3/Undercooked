<template>
  <div
    class="splash min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white px-6"
  >

    <h1 class="text-4xl md:text-5xl font-extrabold mb-10 drop-shadow-lg text-center">
      Choose an Option
    </h1>

    <div class="flex flex-col space-y-4 w-full max-w-xs">
      <button
        @click="goHost"
        class="w-full py-3 rounded-lg bg-white text-blue-600 font-semibold text-lg shadow-lg 
               hover:scale-105 hover:bg-gray-100 transition transform duration-200"
      >
        Host a Game
      </button>

      <button
        @click="goJoin"
        class="w-full py-3 rounded-lg bg-black/20 backdrop-blur text-white font-semibold text-lg shadow-lg
               hover:scale-105 hover:bg-black/30 transition transform duration-200"
      >
        Join a Game
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goHost() {
    router.push("/host");
}

function goJoin() {
    router.push("/join");
}
</script>
