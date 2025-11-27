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
export const useTerminalStore = defineStore('terminal', () => {
    const heldItems: Reactive<Array<Item>> = reactive([]);
    const id: Ref<null | number> = ref(null);
    const isPlaying: Ref<boolean> = ref(false);
})
export type TerminalStore = ReturnType<typeof useTerminalStore>;
