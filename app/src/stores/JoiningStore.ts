import { handshakeData, intendedRoles } from "@shared/types"
import { useSocketStore } from "./SocketStore"
import router from '@/router'
import { defineStore } from "pinia"
import { io } from "socket.io-client"

import sharedEnums from "@shared/enums"

const serverPort = `:${sharedEnums.portServer.port}`
const sharedRemotes = sharedEnums.sharedRemotes
const rolesToRoutes: Record<string, string> = { host: '/hosting', }

function navigateToRoleRoute(role: string) {
    const targetRoute = rolesToRoutes[role]
    if (!targetRoute) return

    router.push(targetRoute)
}

export const useJoiningStore = defineStore("joining", () => {
    function attemptJoinLobby(code: string, role: intendedRoles) {
        const handshake: handshakeData = { intendedRole: role, lobbyCode: code }
        const clientSocket = io(serverPort, { auth: handshake })

        clientSocket.on(sharedRemotes.connectError, (errorMessage: Error) => {
            console.error("Connection error:", errorMessage)
        })

        clientSocket.on(sharedRemotes.connect, () => {
            console.log("Successfully connected to server as", role)

            const socketStore = useSocketStore()
            socketStore.setSocket(clientSocket)
            socketStore.setGameRole(role)

            navigateToRoleRoute(role)
        })
    }

    return { attemptJoinLobby }
})