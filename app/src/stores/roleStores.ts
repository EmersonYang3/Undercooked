import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import enums from "@shared/enums";
import { stationRawMap } from "@/utils/lut";
import { Socket } from "socket.io-client";
export type Item = string;
export type StationType = "stove" | "oven" | "toaster" | "boiler" | "mixer" | "brewer" | "assembler" | "dispenser";
export const useHostStore = defineStore(enums.gameRoles.host, () => {
    const id: Ref<null | string> = ref(null);
    let isReady: boolean = false;
    const players: Ref<Array<number>> = ref([]);
    const stations: Ref<Array<number>> = ref([]);
    return {
        id, isReady, players, stations
    }
})

export const useTerminalStore = defineStore(enums.gameRoles.station, () => {
    const heldItems: Ref<Array<Item | null>> = ref([null]);
    const id: Ref<null | string> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    let clientsKeys: Array<string> = [];
    let isReady: boolean = false;
    let maxItems = 1;
    let station: null | StationType = null;
    function startGame() {
        isPlaying.value = true;
    }
    function endGame() {
        isPlaying.value = false;
    }
    function setId(uniqId: string) {
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
    function placeItem(item: string,) {
        if (!item) {
            console.log("player has no item");
            return;
        }
        const emptyIndex = heldItems.value.findIndex(i => i === null);
        if (emptyIndex === -1) {
            console.log("terminal has no space");
            return;
        }
        //add emits to this here
        heldItems.value[emptyIndex] = item;
        //backend removes the item from the player inventory if possible to be used
    }
    function checkValidity(item: string) {
        //import the sets and lookup the proper items;
        if (!station) {
            //throw an error/panic
        }
        if (stationRawMap[station].has(item)) {
            return true;
        }
        //return an error otherwise
        return false;
    }
    return {
        clientsKeys,
        startGame,
        endGame,
        heldItems,
        id,
        isPlaying,
        setId,
        setStationType,
        takeItem,
        placeItem,
        isReady,
        station
    }
})
export const usePlayerStore = defineStore(enums.gameRoles.client, () => {
    const inventory: Ref<null | string> = ref(null);
    const id: Ref<null | string> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    let isReady: boolean = false;
    function updateInventory(item: string) {
        inventory.value = item;
    }
    function clearInventory() {
        inventory.value = null;
    }
    function setId(uniqid: string) {
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
        endGame,
        isReady
    }
})

export type HostStore = ReturnType<typeof useHostStore>;
export type TerminalStore = ReturnType<typeof useTerminalStore>;
export type PlayerStore = ReturnType<typeof usePlayerStore>;
export type RoleStore = HostStore | TerminalStore | PlayerStore;

