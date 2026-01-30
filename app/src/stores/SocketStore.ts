import { intendedRoles, uniqueIdentifier } from "@shared/types"
import { defineStore } from "pinia"
import { Socket } from "socket.io-client"
import { ref } from "vue"
import { initialRoleEvents, RoleEvents } from "@/connections/rewrite/table"
import { RoleStore } from "./rewrite/roleStores"
import { onEvents } from "@/utils/utils"

export const useSocketStore = defineStore("socket", () => {
    const socket = ref<Socket | null>(null)
    const gameRole = ref<string | intendedRoles>(null)
    const uniqueIdentifier = ref<uniqueIdentifier | null>(null)
    function bindEvents(roleStore: RoleStore) {
        if (!socket.value) {
            throw new Error("There was no socket to bind events for");
        }
        if (!gameRole.value) {
            throw new Error("Game role was not set unable to determine appropiate event table");
        }
        const binder = RoleEvents[gameRole.value];
        const events = binder(roleStore);
        onEvents(socket.value as Socket, events);
    }
    function bindInitEvents(roleStore: RoleStore) {
        if (!socket.value) {
            throw new Error("There was no socket to bind events for");
        }
        if (!gameRole.value) {
            throw new Error("Game role was not set unable to determine appropiate event table");
        }
        const binder = initialRoleEvents[gameRole.value];
        const events = binder(roleStore);
        onEvents(socket.value as Socket, events);
    }
    function setSocket(newSocket: Socket) { socket.value = newSocket }
    function setUniqueIdentifier(id: uniqueIdentifier) { uniqueIdentifier.value = id }
    function setGameRole(role: string) { gameRole.value = role }

    function onSocketEvent(event: string, callback: (...args: any[]) => void) {
        if (!socket.value) return
        socket.value.on(event, callback)
    }

    return { bindInitEvents, socket, gameRole, uniqueIdentifier, setSocket, setUniqueIdentifier, setGameRole, onSocketEvent, bindEvents }
})