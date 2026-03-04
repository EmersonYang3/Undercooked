import { defineStore } from "pinia";
import { useSocketStore } from "../SocketStore";
import { uniqueIdentifier } from "@shared/types";

export const useStationStore = defineStore("station", () => {
    const socketStore = useSocketStore()
    const fromServerEvents = socketStore.FromServerRemotes.ToStation

    let thisStationRole = null

    function initializePreconnections() {
        const pendingJoin = fromServerEvents.pendingJoin

        socketStore.attachEventListener(pendingJoin, (identifier: uniqueIdentifier) => {
            console.log("Received station pending join with identifier:", identifier)
            socketStore.setUniqueIdentifier(identifier)
            socketStore.removeEventListener(pendingJoin)
        })

        console.log("Station preconnections initialized")
    }

    function setStationRole(role: string) {
        thisStationRole = role
    }

    return { initializePreconnections }
})