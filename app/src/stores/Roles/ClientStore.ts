import { defineStore } from "pinia"
import { ref } from "vue"

import { useSocketStore } from "../SocketStore"
import { uniqueIdentifier } from "@shared/types"

export const useClientStore = defineStore("client", () => {
    const specialKey = ref<string | null>(null)
    const socketStore = useSocketStore()
    const fromServerEvents = socketStore.FromServerRemotes.ToClient

    function initializePreconnections() {
        const pendingJoin = fromServerEvents.pendingJoin

        socketStore.attachEventListener(pendingJoin, (identifier: uniqueIdentifier) => {
            socketStore.setUniqueIdentifier(identifier)
            socketStore.removeEventListener(pendingJoin)
        })

        console.log("Client preconnections initialized")
    }

    function setSpecialKey(key: string) {
        console.log("Setting special key:", key)
        specialKey.value = key
    }

    return { initializePreconnections, setSpecialKey, specialKey }
})