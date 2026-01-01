import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import enums from "@shared/enums";
import { stationRawMap } from "@/utils/lut";
import { Socket } from "socket.io-client";
import { MessageStore, JoinRequest } from "./messageStore";
import { foodItem, plate } from "@shared/types";
export type Item = string;
export type StationType = "stove" | "oven" | "toaster" | "boiler" | "mixer" | "brewer" | "assembler" | "dispenser";
export const useHostStore = defineStore(enums.gameRoles.host, () => {
    const id: Ref<null | string> = ref(null);
    let isReady: Ref<boolean> = ref(false);
    const players: Ref<Array<number>> = ref([]);
    const stations: Ref<Array<number>> = ref([]);
    return {
        id, isReady, players, stations
    }
})

export const useTerminalStore = defineStore(enums.gameRoles.station, () => {
    const heldItems: Ref<Array<foodItem | plate | null>> = ref([null]);
    const id: Ref<null | string> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    let clientsKeys: Set<string> = new Set();
    let isReady: Ref<boolean> = ref(false);
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
    function placeItem(item: foodItem | plate | null,) {
        if (!item) {
            console.log("player has no item");
            return;
        }
        const emptyIndex = heldItems.value.findIndex(i => i === null);
        if (emptyIndex === -1) {
            console.log("terminal has no space");
            return;
        }
        //add emits to this here-
        heldItems.value[emptyIndex] = item;
        //backend removes the item from the player inventory if possible to be used
    }
    function givePlayerItem() {
        
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
        placeItem,
        isReady,
        station
    }
})
export const usePlayerStore = defineStore(enums.gameRoles.client, () => {
    const inventory: Ref<null | string> = ref(null);
    const id: Ref<null | string> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    let isReady: Ref<boolean> = ref(false);
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

