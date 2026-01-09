import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import sharedEnums from "@shared/enums";
import { activeRecipe } from "@shared/types";
export type Item = string;
export type StationType = "stove" | "oven" | "toaster" | "boiler" | "mixer" | "brewer" | "assembler" | "dispenser";
export const useHostStore = defineStore(sharedEnums.gameRoles.host, () => {
    const id: Ref<null | string> = ref(null);
    let isReady: Ref<boolean> = ref(false);
    const players: Ref<Array<number>> = ref([]);
    const stations: Ref<Array<number>> = ref([]);
    const activeRecipes: Ref<Map<number, activeRecipe>> = ref(new Map());
    const score: Ref<number> = ref(0);
    function setActiveRecipe(id: number, foodItem: activeRecipe) {
        activeRecipes.value.set(id, foodItem);
    }
    function deleteActiveRecipe(id: number) {
        activeRecipes.value.delete(id);
    }
    function setScore(newScore: number) {
        score.value = newScore;
    }
    return {
        score, setScore, id, isReady, players, stations, activeRecipes, setActiveRecipe, deleteActiveRecipe
    }
})

export const useTerminalStore = defineStore(sharedEnums.gameRoles.station, () => {
    const id: Ref<null | string> = ref(null);
    const currentHelditem = ref<null | string>(null);
    const isPlaying: Ref<boolean> = ref(false);
    let clientsKeys: Set<string> = new Set();
    let isReady: Ref<boolean> = ref(false);
    let station = ref<string | null>(null);
    function startGame() {
        isPlaying.value = true;
    }
    function endGame() {
        isPlaying.value = false;
    }
    function setId(uniqId: string) {
        id.value = uniqId;
    }
    function setStationType(stationType: string) {
        station.value = stationType;
    }
    function setCurrentItem(item: string) {
        currentHelditem.value = item;
    }
    return {
        clientsKeys,
        startGame,
        endGame,
        id,
        isPlaying,
        setId,
        setCurrentItem,
        setStationType,
        isReady,
        station,
        currentHelditem,
    }
})
export const usePlayerStore = defineStore(sharedEnums.gameRoles.client, () => {
    const inventory: Ref<null | string> = ref(null);
    const id: Ref<null | string> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
    const key = ref<string | null>(null);
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
    function setKey(playerKey: string) {
        key.value = playerKey;
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
        setKey,
        isReady
    }
})

export type HostStore = ReturnType<typeof useHostStore>;
export type TerminalStore = ReturnType<typeof useTerminalStore>;
export type PlayerStore = ReturnType<typeof usePlayerStore>;
export type RoleStore = HostStore | TerminalStore | PlayerStore;