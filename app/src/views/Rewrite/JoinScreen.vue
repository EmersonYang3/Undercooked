<template>
    <div v-if="currentScreen == 'code'">
        <div>
            <input @input="formatCode" type="input" v-model="code"> 
            <button @click="submitCode">Submit Code</button>
        </div>
    </div>
    <div v-if="currentScreen == 'waiting'"> 
        Waiting for the Client to let you in
    </div>
</template>

<script setup lang="ts">
import { usePlayerStore, useTerminalStore } from '@/stores/roleStores';
import { useSocketStore } from '@/stores/sockets';
import { ref, Ref, watch } from 'vue';

const emit = defineEmits(["start"]);
const props = defineProps<{
    role: "client" | "station"
}>()
const store = props.role === "client"
    ? usePlayerStore()
    : useTerminalStore();
const code: Ref<string> = ref("");
const socketStore = useSocketStore();
type Screen = 'waiting' | 'code'
const currentScreen = ref<Screen>('code');
function submitCode() {
    if (code.value.length != 6) {
        return;
    }
    const auth = {
        intendedRole: props.role,
        lobbyCode: code.value,
    };
    socketStore.createSocket(auth, store);
}
function formatCode() {
    code.value = code.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6);
}
watch(() => store.isReady, (ready) => {
    emit("start");
})
</script>

<style scoped>
</style>