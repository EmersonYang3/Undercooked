import { SocketStore } from "@/stores/SocketStore";
export function validateKeys(keys: Set<string>): boolean {
    keys.forEach((key) => {
        if (key.length != 1 || key == " ") {
            return false;
        }
    })
    return true;
}
/**
 * Creates a single-click listener for a set of keys that triggers a callback and emits a socket event.
 * 
 * The listener is "one-shot" per arming: it will remove itself after a matching key is pressed.
 * You can manually re-arm it using the `arm()` method.
 *
 * @param keys - A set of strings representing the allowed keys (case-insensitive)
 * @param socketStore - The socket store containing a connected Socket.IO instance
 * @param callback - A function to be called with the server response after the socket emit
 *
 * @returns An object with methods to control the listener:
 *   - `arm()`: attach the listener so it can detect key presses
 *   - `disarm()`: remove the listener and prevent detection
 *
 * @example
 * const singleClickA = createSingleClick(new Set(["a", "b"]), socketStore, (res) => {
 *   console.log("Server responded:", res)
 * })
 * 
 * // Activate the listener
 * singleClickA.arm()
 * 
 * // Later, you can manually disarm it if needed
 * singleClickA.disarm()
 *
 * Notes:
 * - Only the first matching key press triggers the callback and socket emit.
 * - After triggering, you must call `arm()` again to detect subsequent key presses.
 * - The socket emit uses a record object `{ key: event.key }` to make data structure inference easier.
 */
export function createSingleClick(
    keys: Set<string>,
    socketStore: SocketStore,
    callback: (...args: any[]) => void,
) {
    const socket = socketStore.socket
    if (!socket) throw new Error("Failed to acquire a socket")
    let bound = false
    async function listener(event: KeyboardEvent) {
        if (!keys.has(event.key.toLowerCase())) return
        document.removeEventListener("keydown", listener)
        bound = false
        try {
            //I think we should switch to records when it comes to passing stuff in the emits
            //Makes it a lot easier to infer the structure of the data
            const response = await socket.emitWithAck("event", {
                key: event.key
            });
            callback(response);
        } catch (err) {
            console.error("Socket request failed", err)
        }
    }
    function arm() {
        if (!bound) {
            document.addEventListener("keydown", listener)
            bound = true
        }
    }
    function disarm() {
        if (bound) {
            document.removeEventListener("keydown", listener)
            bound = false
        }
    }
    return { arm, disarm }
}
export type SingleClickChecker = ReturnType<typeof createSingleClick>
//takes a single string to prevent improper usage
function validateKey(key: string): boolean {
    return key != " " && key.length == 1;
}
/**
 * Crates a checker that checks if a specific key was held down for a specified duration.
 *
 * @param key - The key to track (single character, non-space)
 * @param duration - Time in milliseconds the key must be held to be considered "completed"
 * @param onFirstPress - Optional callback invoked when the key is initially pressed; can be used to start your own logic or timers
 *
 * @returns An object with methods to arm/disarm the listener and check if the hold was successful:
 *   - arm(): start listening for key presses
 *   - disarm(): stop listening and reset internal state
 *   - wasHeldLongEnough(): returns true if the key was held for at least `duration`
 * @example
 * const holdA = holdChecker("a", 1000, () => {
 *   console.log("User pressed A, starting hold timer...")
 * })
 * holdA.arm()
 *
 * // Later, check if hold was completed
 * if (holdA.wasHeldLongEnough()) {
 *   console.log("Key was held long enough!")
 * }
 *
 * Notes:
 * - The timer starts only when the key is first pressed after arming.
 * - `wasHeldLongEnough` should be checked after the expected hold time.
 * - The timeout duration should be slightly longer than `duration` to account for timing variations.
 */
export function createHoldChecker(
    key: string,
    duration: number, // how long the key must be held
    onFirstPress?: () => void // optional callback when the key is first pressed
) {
    if (!validateKey(key)) throw new Error("Invalid key")

    let pressed = false         // is the key currently down
    let completed = false       // did the hold succeed
    let timeoutId: number | null = null
    function keydownListener(event: KeyboardEvent) {
        if (event.key.toLowerCase() !== key.toLowerCase()) return
        if (pressed) return // ignore repeat keydowns

        pressed = true
        completed = false
        // Call user callback on first press
        if (onFirstPress) onFirstPress()

        // Start the hold timer
        timeoutId = window.setTimeout(() => {
            if (pressed) {
                completed = true
            }
        }, duration)
    }

    function keyupListener(event: KeyboardEvent) {
        if (event.key.toLowerCase() !== key.toLowerCase()) return

        pressed = false
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    function arm() {
        document.addEventListener("keydown", keydownListener)
        document.addEventListener("keyup", keyupListener)
    }

    function disarm() {
        document.removeEventListener("keydown", keydownListener)
        document.removeEventListener("keyup", keyupListener)
        if (timeoutId !== null) clearTimeout(timeoutId)
        pressed = false
        completed = false
    }

    function wasHeldLongEnough() {
        return completed
    }

    return { arm, disarm, wasHeldLongEnough }
}
export type HoldChecker = ReturnType<typeof createHoldChecker>;
/**
 * Tracks the number of times a key is pressed and executes a callback when a condition is met.
 *
 * @param key - The key to track (single character, non-space)
 * @param callback - Function to call when the condition returns true
 * @param condition - Function that receives the current pressCount and returns true if callback should be executed
 *
 * @returns An object with methods to arm/disarm the tracker
 * @example 
 *  const tracker = trackKeyPress(
 *       "a",
 *       () => console.log("Key pressed enough times!"),
 *       (pressCount) => pressCount >= 5
 *   )
 *   tracker.arm()
 */
export function trackKeyPress(
    key: string,
    callback: () => void,
    condition: (pressCount: number) => boolean,
) {
    if (!validateKey(key)) throw new Error("Invalid key")

    let pressCount = 0
    let bound = false

    function keydownListener(event: KeyboardEvent) {
        if (event.key.toLowerCase() !== key.toLowerCase()) return

        pressCount++
        if (condition(pressCount)) {
            callback()
        }
    }

    function arm() {
        if (!bound) {
            document.addEventListener("keydown", keydownListener)
            bound = true
        }
    }

    function disarm() {
        if (bound) {
            document.removeEventListener("keydown", keydownListener)
            bound = false
        }
    }

    function reset() {
        pressCount = 0
    }

    return { arm, disarm, reset, getPressCount: () => pressCount }
}
export type KeyPressTracker = ReturnType<typeof trackKeyPress>
