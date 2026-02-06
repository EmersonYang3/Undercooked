import { holdableItem } from "@shared/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useGameStore = defineStore("player", () => {
    const heldItem = ref<null | holdableItem>(null);
    const clientKeys = ref<null | Set<string>>(null);
    function setItem(newItem: holdableItem) {
        heldItem.value = newItem;
    }
    function getItem(): Ref<holdableItem | null> {
        return heldItem;
    }
    function setClientKeys(newKeys: Set<string>) {
        clientKeys.value = newKeys;
    }
    function getClientKeys(): Ref<Set<string> | null> {
        return clientKeys;
    }
    return { setItem, getItem, setClientKeys, getClientKeys, heldItem, clientKeys }
})