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
export function createKeyTracker(targetKey: Set<string>, callback?: (pressedKey: string) => void) {
    let pressCount = 0;
    let pressedKey = ref<string | null>(null);
    function keydownListener(event: KeyboardEvent) {
        if (!targetKey.has(event.key)) return;
        // Prevent repeat keydown from
        // restarting the timer
        pressedKey.value = event.key;
        pressCount++;
        if (callback) {
            callback(pressedKey.value);
        }
    }

    //resets 
    function keyupListener(event: KeyboardEvent) {
        if (!targetKey.has(event.key)) return;
        pressedKey = null;
        pressCount = 0;
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
        getPressedKey: () => pressedKey,
    };
}
export type KeyTracker = ReturnType<typeof createKeyTracker>;
