import { defineStore } from "pinia"
import { useSocketStore } from "../SocketStore"
import { uniqueIdentifier } from "@shared/types"

export const useClientStore = defineStore("client", () => {
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
    return { initializePreconnections }
})