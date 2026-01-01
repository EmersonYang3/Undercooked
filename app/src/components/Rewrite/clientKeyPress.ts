import { onMounted, onUnmounted, ref } from "vue";
export function useClientConnection(validKeys: Set<string>, onKeySelected: (key: string) => void) {
    const keyClient = ref<string | null>(null);
    function listener(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (!validKeys.has(key)) return;
        keyClient.value = key;
        onKeySelected(key);
        document.removeEventListener("keydown", listener);
    }
    function startListening() {
        document.addEventListener("keydown", listener);
    }
    function stopListening() {
        document.removeEventListener("keydown", listener);
    }
    onMounted(() => {
        startListening();
    });

    onUnmounted(() => {
        stopListening();
    });
    return {
        keyClient,
        startListening,
        stopListening,
    }
}