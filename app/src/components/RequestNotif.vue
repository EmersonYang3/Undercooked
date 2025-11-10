<template>
    <div class="absolute">
    <div class="relative w-screen h-screen">
    <div
      class="absolute bottom-0 right-0 flex flex-col-reverse items-end space-y-3 space-y-reverse p-4 max-h-[32rem] overflow-y-auto"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="bg-gray-900 text-white rounded-lg w-64 shadow-lg p-3 flex items-start justify-between border border-gray-700 hover:border-gray-500 transition"
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
import { Reactive, reactive } from 'vue';
defineProps(['message']);
type Message =  { 
    client_name:string, 
    message:string,
    expiry?:number,
    id:number,
}
let messages:Reactive<Array<Message>> = reactive([]);
function createMessage(msg: Omit<Message, 'id'>) {
    const id = Date.now() // simple unique id
    const message: Message = { id, ...msg }
    messages.push(message)
    if (message.expiry && message.expiry > 0) {
        createNewInterval(id)
    }
}
//this is the function that gets called in the backend
function createNewInterval(id: number) {
    const timer = setInterval(() => {
        const msg = messages.find(m => m.id === id)
        if (!msg) {
            clearInterval(timer)
            return
        }
        if (msg.expiry !== undefined) {
            msg.expiry--
            if (msg.expiry <= 0) {
                removeMessage(id)
                clearInterval(timer)
            }
        }
    }, 1000)
}
function removeMessage(id: number) {
    const index = messages.findIndex(m => m.id === id)
    if (index !== -1) {
        messages.splice(index, 1)
    }
}
function rejectMessage(id:number) {
    removeMessage(id)
}
function acceptMessage(id:number) {
    removeMessage(id)
}


document.addEventListener('keydown', (event) => {
    if (event.key !== '~') return
    createMessage({
        client_name: 'a',
        message: "Accept New Player?",
        expiry: undefined,
    })
})
</script>

<style scoped>

</style>