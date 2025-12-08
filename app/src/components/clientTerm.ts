import { useTerminalStore } from "@/stores/roleStores";
import { useSocketStore } from "@/stores/sockets";
import { watch } from "vue";
import { Socket } from "socket.io-client";
import { ref, onMounted, onUnmounted } from "vue";
export function useClientConnection(clientKeys: Map<string, boolean>) {
    const keyClient = ref<string | null>(null);
    function listener(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (clientKeys.get(key)) {
            keyClient.value = key;
            document.removeEventListener("keydown", listener);
        }
    }
    function startListening() {
        document.addEventListener("keydown", listener);
    }
    function stopListening() {
        document.removeEventListener("keydown", listener);
    }
    onMounted(startListening);
    onUnmounted(stopListening);
    return {
        keyClient,
        startListening,
        stopListening
    };
}
//could merge this with createStationGame
export function pollForClient(clientKeys: Set<string>) {
    const clientKey = ref<string | null>(null);
    function listener(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (clientKeys.has(key)) {
            clientKey.value = key;
            document.removeEventListener("keydown", listener);
        }
    }
    function startListening() {
        document.addEventListener("keydown", listener);
    }
    function stopListening() {
        document.removeEventListener("keydown", listener);
    }
    startListening();
    onUnmounted(stopListening);
    return {
        clientKey,
        startListening,
        stopListening,
    };
}

//make the function manage its own state so another function factory
//or make it into a class for easier state management without complex callback passing 
export function createStationGame(
    endGame: () => void,
    startGame: () => void,

) {
    const socketStore = useSocketStore();
    const terminalStore = useTerminalStore();
    let clientKeys: null | Set<string> = null;
    let socket: Socket | null = null;
    const clientKey = ref<string | null>(null);
    function listener(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (clientKeys.has(key)) {
            clientKey.value = key;
            stopListening();
        }
    }
    function startListening() {
        document.addEventListener("keydown", listener);
    }
    function stopListening() {
        document.removeEventListener("keydown", listener);
    }
    startListening();
    onUnmounted(stopListening);
    //this is the function that gets called first 
    function initialize() {
        if (terminalStore.clientsKeys == null || terminalStore.clientsKeys.length == 0) {
            console.log("invalid client keys");
        }
        clientKeys = new Set(terminalStore.clientsKeys);
        socket = socketStore.getSocket();
        watch(clientKey, (key) => {
            if (key) start(key);
        })
    }
    function start(key: string) {
        let priorSize = terminalStore.heldItems.length;
        socket.emit("attemptPlace", key);
        if (priorSize != terminalStore.heldItems.length) {
            console.log("item couldnt be placed here or empty inventory")
            startListening();
        } else {
            startGame();
        }
    }
    return {
        initialize, startListening, stopListening,
    };
}