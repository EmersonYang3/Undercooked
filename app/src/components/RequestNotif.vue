<template>
  <div class="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div class="relative w-screen h-screen">
        <div
          class="absolute bottom-0 right-0 flex flex-col-reverse items-end space-y-3 space-y-reverse p-4 max-h-[32rem] overflow-y-auto"
        >
          <div
            v-for="(message, index) in notifStore.requests"
            :key="index"
            class="bg-gray-900 pointer-events-auto text-white rounded-lg w-64 shadow-lg p-3 flex items-start justify-between border border-gray-700 hover:border-gray-500 transition"
          >
            <div class="flex-1 pr-2">
              <div class="font-semibold text-sm text-gray-200">{{ message.client_name }}</div>
              <div class="text-gray-300 text-xs mt-1 break-words">
                {{ message.message }}
              </div>
            </div>
            <div class="flex flex-col space-y-1">
              <button
                @click="acceptMessage(message.id)"
                class="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded px-2 py-1 transition"
              >
                ✓
              </button>
              <button
                @click="rejectMessage(message.id)"
                class="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded px-2 py-1 transition"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRequestNotifStore } from '@/stores/messageStore';
import { useSocketStore } from '@/stores/sockets';

//make sure to change this to account for both station and player joins
//currently only accounts for just players
//way too much store dependencies 
//might try and refine this partt
const notifStore = useRequestNotifStore();
const socketStore = useSocketStore();
const socket = socketStore.getSocket();
function acceptMessage(id: number) {

  socket.emit("acceptClientJoin", id);
  notifStore.accept(id);
}
function rejectMessage(id: number) {
  //this hasnt been implemented on backend yet
  //!!!  
  socket.emit("rejectClientJoin", id);
  notifStore.reject(id);
}
</script>

<style scoped>

</style>