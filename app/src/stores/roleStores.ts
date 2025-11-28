import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import enums from "@shared/enums";
type Item = string;
type StationType = "stove" | "oven" | "placeholder";
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
    let isReady: boolean = false;
    let maxItems = 1;
    let station = null;
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
        placeItem,
        isReady
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

