import { defineStore } from "pinia";
import { reactive, Reactive, Ref, ref } from "vue";
export const usePlayerStore = defineStore('player', () => {
    const inventory: Ref<null | string> = ref(null);
    const id: Ref<null | number> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);
    function updateInventory(item: string) {
        inventory.value = item;
    }
    function clearInventory() {
        inventory.value = null;
    }
    function setId(uniqid: number) {
        id.value = uniqid;
    }
    function startGame() {
        isPlaying.value = true;
    }
    function endGame() {
        isPlaying.value = false;
    }
    return {
        inventory,
        id,
        isPlaying,
        updateInventory,
        clearInventory,
        setId,
        startGame,
        endGame
    }
})
type Item = string;
export type PlayerStore = ReturnType<typeof usePlayerStore>;
type StationType = "stove";
export const useTerminalStore = defineStore('terminal', () => {
    const heldItems: Ref<Array<Item | null>> = ref([null]);
    const id: Ref<null | number> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    let maxItems = 1;
    let station = null;
    function startGame() {
        isPlaying.value = true;
    }
    function endGame() {
        isPlaying.value = false;
    }
    function setId(uniqId: number) {
        id.value = uniqId;
    }
    function setStationType(max: number, stationType: StationType) {
        maxItems = max;
        station = stationType;
        heldItems.value = Array(max).fill(null);
    }
    function takeItem(player: PlayerStore, itemIndex: number) {
        if (itemIndex >= maxItems) {
            console.log("invalid index");
            return;
        }
        const item = heldItems.value[itemIndex];
        if (!item) return;
        if (player.inventory) {
            console.log("player already has an item");
            return;
        }
        player.inventory = item;
        heldItems.value[itemIndex] = null;
    }
    function placeItem(player: PlayerStore) {
        const item = player.inventory;
        if (!item) {
            console.log("player has no item");
            return;
        }
        if (!checkValidity(item)) {
            console.log("item cannot be placed here");
            return;
        }
        const emptyIndex = heldItems.value.findIndex(i => i === null);
        if (emptyIndex === -1) {
            console.log("terminal has no space");
            return;
        }
        heldItems.value[emptyIndex] = item;
        player.clearInventory();
    }
    function checkValidity(item: string) {
        //this section checks based off of some lut specified by station type
        //placeholder for now
        return true;
    }
    return {
        startGame,
        endGame,
        heldItems,
        id,
        isPlaying,
        setId,
        setStationType,
        takeItem,
        placeItem
    }
})
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
//these must come from the shared folder
export type uniqueIdentifier = number
export type socketConnection = {
    socket: Socket,
    identifier: uniqueIdentifier
}
export type AuthData = {
    intendedRole: string,
    lobbyCode: string,
}
export const socketStore = defineStore("socket", () => {
    let socket: Socket | null = null;
    //if u ever need reactive state for the socket for whatever reason use identifier for
    let identifier: Ref<string | null> = ref(null);
    function createSocket(authData: AuthData): Socket {
        if (socket) return socket;
        socket = io("http://localhost:3000", {
            autoConnect: false,
            auth: authData,
        }) as Socket;
        socket.on("lobbyStarted", (specialKey: string) => {
            identifier.value = specialKey;
            console.log(`Client accepted with special key: ${specialKey}`);
        });
        socket.on("connect_error", (error) => {
            console.log(`connection error: ${error.message}`)
        })
        socket.connect();
        return socket;
    }
    function getSocket(): Socket | null {
        return socket;
    }
    function disconnect() {
        if (!socket) return;

        socket.disconnect();
        socket.removeAllListeners();
        socket = null;
        identifier.value = null;
    }
    return {
        socket,
        identifier,
        createSocket,
        getSocket,
        disconnect,
    }
})

export type TerminalStore = ReturnType<typeof useTerminalStore>;
