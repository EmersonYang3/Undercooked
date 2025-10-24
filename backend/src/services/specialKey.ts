import type { socketConnection } from "utils/types";

let availableKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let usedKeys: string[] = [];

let registry: Record<string, socketConnection> = {}

function generateSpecialKey(): string {
    if (usedKeys.length >= availableKeys.length) {
        throw new Error("No more unique keys available");
    }

    const newKey = availableKeys.charAt(usedKeys.length);
    usedKeys.push(newKey);

    return newKey;
}

function releaseSpecialKey(key: string): void {
    const index = usedKeys.indexOf(key);

    if (index !== -1) { usedKeys.splice(index, 1) }
}

function registerSocketConnection(socket: socketConnection, key: string): void {
    registry[key] = socket;
}

function getSocketConnectionByKey(key: string): socketConnection | null {
    return registry[key] || null;
}

export default { generateSpecialKey, releaseSpecialKey, registerSocketConnection, getSocketConnectionByKey }