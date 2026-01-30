import { ref } from "vue";

export function acquireEventListener(validKeys: Set<string>, start: (key: string) => void) {
    const pressedKey = ref<string | null>(null);
    function listener(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (!validKeys.has(key)) return;
        pressedKey.value = key;
        document.removeEventListener("keydown", listener);
        start(key);
    }
    function startListening() {
        document.addEventListener("keydown", listener);
    }
    function stopListening() {
        document.removeEventListener("keydown", listener);
    }
    return {
        pressedKey,
        startListening,
        stopListening,
    }
}
