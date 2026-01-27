import { intendedRoles, uniqueIdentifier } from "@shared/types"
import { defineStore } from "pinia"
import { Socket } from "socket.io-client"
import { ref } from "vue"

export const useSocketStore = defineStore("socket", () => {
    const socket = ref<Socket | null>(null)
    const gameRole = ref<string | intendedRoles>(null)
    const uniqueIdentifier = ref<uniqueIdentifier | null>(null)

    function setSocket(newSocket: Socket) { socket.value = newSocket }
    function setUniqueIdentifier(id: uniqueIdentifier) { uniqueIdentifier.value = id }
    function setGameRole(role: string) { gameRole.value = role }

    return { socket, gameRole, uniqueIdentifier, setSocket, setUniqueIdentifier, setGameRole }
})