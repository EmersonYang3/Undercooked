import { intendedRoles, uniqueIdentifier } from "@shared/types"
import { defineStore } from "pinia"
import { Socket } from "socket.io-client"

import { ref } from "vue"

import sharedEnums from "@shared/enums"

const FromServerRemotes = {
    ToClient: sharedEnums.serverToClientRemotes,
    ToHost: sharedEnums.serverToHostRemotes,
    ToStation: sharedEnums.serverToStationRemotes
}

const ToServerRemotes = {
    FromStation: sharedEnums.stationToServerRemotes,
    FromHost: sharedEnums.hostToServerRemotes
}

const GameRoles = sharedEnums.gameRoles

export const useSocketStore = defineStore("socket", () => {
    let socket: Socket | null = (null)
    let gameRole = ref<string | intendedRoles | null>(null)

    let dispatchingEvents: boolean = false
    let eventsToFunctionMap: Record<string, (...args: any[]) => void> = {}

    const uniqueIdentifier = ref<uniqueIdentifier | null>(null)

    function _refreshDispatcher() {
        const shouldDispatch = Object.keys(eventsToFunctionMap).length > 0

        if (shouldDispatch && !dispatchingEvents && socket) {
            dispatchingEvents = true

            socket.onAny((event: string, ...args: any[]) => {
                const callback = eventsToFunctionMap[event]
                if (callback) { callback(...args) }
            })
        } else if (!shouldDispatch && dispatchingEvents && socket) {
            dispatchingEvents = false
            socket.offAny()
        }
    }

    function setSocket(newSocket: Socket) {
        socket = newSocket
        _refreshDispatcher()
    }

    function setUniqueIdentifier(id: uniqueIdentifier) {
        console.log("Setting unique identifier:", id)
        uniqueIdentifier.value = id
    }

    function setGameRole(role: string | intendedRoles) {
        console.log("Setting game role:", role)
        gameRole.value = role
    }

    function attachEventListener(event: string, callback: (...args: any[]) => void) {
        eventsToFunctionMap[event] = callback
        _refreshDispatcher()
    }

    function removeEventListener(event: string) {
        delete eventsToFunctionMap[event]
        _refreshDispatcher()
    }

    function removeAllEventListeners() {
        eventsToFunctionMap = {}
        _refreshDispatcher()
    }

    function emitEvent(event: string, ...args: any[]) {
        if (!socket) { return }
        socket.emit(event, ...args)
    }

    function getGameRole() {
        return gameRole.value
    }

    function getIsClient() {
        return gameRole.value === GameRoles.client
    }

    return {
        socket, gameRole, uniqueIdentifier,
        FromServerRemotes, ToServerRemotes,
        setSocket, setUniqueIdentifier, setGameRole, getGameRole, getIsClient,
        attachEventListener, removeEventListener, removeAllEventListeners, emitEvent
    }
})
export type SocketStore = ReturnType<typeof useSocketStore>;