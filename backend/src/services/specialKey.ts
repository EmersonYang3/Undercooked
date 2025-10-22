let availableKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let usedKeys: string[] = [];

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

    if (index !== -1) {
        usedKeys.splice(index, 1);
    }
}

export default { generateSpecialKey, releaseSpecialKey }