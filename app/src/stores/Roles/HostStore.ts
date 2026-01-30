import { defineStore } from "pinia"

import { useSocketStore } from "../SocketStore"
import { uniqueIdentifier } from "@shared/types"

export const useHostStore = defineStore("host", () => {
    const socketStore = useSocketStore()

    const fromServerEvents = socketStore.FromServerRemotes.ToHost

    function initializePreconnections() {
        const lobbyStarted = fromServerEvents.lobbyStarted

        socketStore.attachEventListener(lobbyStarted, (lobbyCode: string, identifier: uniqueIdentifier) => {
            socketStore.setUniqueIdentifier(identifier)
            socketStore.removeEventListener(lobbyStarted)
        })

        console.log("Client preconnections initialized")
    }

    return { initializePreconnections }
})