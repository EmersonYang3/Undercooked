import { ref, onMounted, onUnmounted, Ref } from "vue";
enum TerminalState {
    idle,
    waiting,
    connected,
    running,
}
//should 100% use a set wtf 
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
