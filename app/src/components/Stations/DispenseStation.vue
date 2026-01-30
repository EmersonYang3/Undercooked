

<script setup lang="ts">
import { useSocketStore } from '@/stores/SocketStore';
import { acquireEventListener } from './eventListener';
import { useTerminalStore } from '@/stores/rewrite/roleStores';
import { onMounted, onUnmounted, ref } from 'vue';

const socketStore = useSocketStore();
const socket = socketStore.socket;
const terminalStore = useTerminalStore();

//cooldown to item dispensing speed
const cooldown = ref<boolean>(false);

function startGame(key: string) {
    socket.emit("specialKeyPressed", terminalStore.id,  key)
    //update something something
    cooldown.value = true;
    setTimeout(() => {
        cooldown.value = false;
        startListening();
    }, 1000)
}
const { startListening, stopListening } = acquireEventListener(terminalStore.clientsKeys, startGame);
onUnmounted(() => {
    //removes all eventhandles just in case they arent done so
    stopListening();
})

//Flow
//Press button 
//Dispense items via the backend
//Goes on cooldown to prevent excessive spam of dispenser
//Rearm itself


</script>
