import { ref } from "vue";


//This can be reused not just for key validation but also the gameplay itself
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





//exposes methods to track the amount of times a key has been pressed or how long its been held down for. 
//the duration handling aspect might be wrong as i got chatgpt to write this. 
export function createKeyTracker(targetKey: string) {
    let pressCount = 0;
    let pressStartTime: number | null = null;

    let lastPressDuration = 0;
    let totalPressDuration = 0;

    function keydownListener(event: KeyboardEvent) {
        if (event.key !== targetKey) return;

        // Prevent repeat keydown from restarting the timer
        if (pressStartTime === null) {
            pressCount++;
            pressStartTime = performance.now();
        }
    }

    function keyupListener(event: KeyboardEvent) {
        if (event.key !== targetKey || pressStartTime === null) return;

        const duration = performance.now() - pressStartTime;

        lastPressDuration = duration;
        totalPressDuration += duration;

        pressStartTime = null;
    }

    function attachListener() {
        document.addEventListener("keydown", keydownListener);
        document.addEventListener("keyup", keyupListener);
    }

    function detachListener() {
        document.removeEventListener("keydown", keydownListener);
        document.removeEventListener("keyup", keyupListener);
    }

    return {
        attachListener,
        detachListener,
        getPressCount: () => pressCount,
        getLastPressDuration: () => lastPressDuration,
        getTotalPressDuration: () => totalPressDuration,
        isPressed: () => pressStartTime !== null,
    };
}

