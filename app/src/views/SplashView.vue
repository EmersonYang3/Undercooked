<template>
    <!-- need to fill up the blank space somehow -->
  <div class="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-300 relative text-center font-sans overflow-hidden">
    <transition name="fade">
      <h1 v-show="!(join || host)" class="absolute top-10 text-6xl font-bold text-gray-800 tracking-wide z-10">Game</h1>
    </transition>
    <transition name="fade">
      <div v-show="!(join || host)" class="flex flex-col sm:flex-row gap-8 items-center justify-center">
        <button
          @click="join = true"
          class="w-60 h-60 sm:w-64 sm:h-64 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded-2xl text-3xl font-semibold shadow-lg hover:scale-105"
        >Join Game</button>
        <button
          @click="host = true"
          class="w-60 h-60 sm:w-64 sm:h-64 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded-2xl text-3xl font-semibold shadow-lg hover:scale-105"
        >Host Game</button>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-show="join" class="absolute inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center text-white">
        <h2 class="text-4xl font-bold mb-8">Enter Join Code</h2>
        <form @submit.prevent="connect" class="flex flex-col items-center">
          <input
            v-model="client_join_code"
            type="text"
            placeholder="Code"
            class="text-center rounded-xl mb-6 text-black bg-white w-64 h-14 text-xl focus:ring-4 focus:ring-blue-400 outline-none"/>
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 transition-all text-white text-lg font-semibold rounded-xl px-8 py-3 shadow-md">Submit</button>
        </form>
        <button @click="join = false" class="absolute top-6 right-6 text-white text-2xl hover:text-red-400">✖</button>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-show="host" class="absolute inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center text-white">
        <div class="mb-6 text-2xl">
          <span v-if="joinCode">Game Code: <strong>{{ joinCode }}</strong></span>
          <span v-else>Waiting for Game Code...</span>
        </div>
        <button @click="startup" class="bg-blue-500 hover:bg-blue-600 text-lg font-semibold rounded-xl px-10 py-4 shadow-md">Host Game</button>
        <button @click="host = false" class="absolute top-6 right-6 text-white text-2xl hover:text-red-400">X</button>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="waiting_screen"
        class="absolute inset-0 bg-black flex flex-col items-center justify-center text-white z-20"
      >
      <RequestNotif></RequestNotif>
      <div class="text-xl mb-4">Role: {{ role }}</div>
        <div class="text-xl mb-8">Players Connected: {{ current_player_count }}</div>
        <button
          @click="startGame"
          class="bg-red-500 hover:bg-red-600 text-2xl font-bold rounded-xl w-64 h-20 transition-all hover:scale-105 shadow-lg"
        >
          Start
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import RequestNotif from '@/components/RequestNotif.vue';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
const join = ref(false);
const host = ref(false);
const joinCode:Ref<null | number> = ref(null);
const client_join_code:Ref<null | number> = ref(null);
const waiting_screen = ref(false);
const current_player_count = ref(0);
const role:Ref<null | Role> = ref(null);
type Role = "host" | "terminal" | "player";
//assume there is a method to start up a server in the backend
function startup(): number {
    host.value = false;
    waiting_screen.value = true;
    role.value = "host";
    router.push('/host');
    return Math.round(Math.random() * 1000);
    
}
const router = useRouter();
const goToJoin = () => {

}
function startGame() {
}


function connect() {
    console.log(client_join_code.value)
    //waiting for backend ocde here
    //basically just submit the code to the backend to search for a game
    if(true) {
        //route to the client view now 
        //might add atomatic device detection to determine client or terminal
        //for now imma just roue to terminal view as i needa flesh that out
        router.push('/terminal')
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>