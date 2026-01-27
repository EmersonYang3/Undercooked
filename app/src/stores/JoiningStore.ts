import { handshakeData, intendedRoles } from "@shared/types"
import { useSocketStore } from "./SocketStore"
import { useLobbyCodeStore } from "./LobbyCode"
import { defineStore } from "pinia"
import { io } from "socket.io-client"

import router from '@/router'
import sharedEnums from "@shared/enums"
import { RoleStore, useHostStore, usePlayerStore, useTerminalStore } from "./rewrite/roleStores"

const gameRoles = sharedEnums.gameRoles

const serverPort = `:${sharedEnums.portServer.port}`
const sharedRemotes = sharedEnums.sharedRemotes

const rolesToRoutes: Record<string, string> = {
    [gameRoles.host]: '/hosting',
    [gameRoles.client]: '/client',
    [gameRoles.station]: '/terminal'
}

const rolesToStoreInitializers: Record<string, () => RoleStore> = {
    [gameRoles.host]: useHostStore,
    [gameRoles.client]: usePlayerStore,
    [gameRoles.station]: useTerminalStore
}

function getRoleStore(role: string): RoleStore {
    const storeInitializer = rolesToStoreInitializers[role]
    if (!storeInitializer) { throw new Error(`No store initializer found for role: ${role}`) }

    return storeInitializer()
}

function navigateToRoleRoute(role: string) {
    const targetRoute = rolesToRoutes[role]
    if (!targetRoute) return

    router.push(targetRoute)
}

export const useJoiningStore = defineStore("joining", () => {
    function attemptJoinLobby(role: intendedRoles) {
        const lobbyCodeStore = useLobbyCodeStore()
        if (!lobbyCodeStore.isLobbyCodeValid()) { return }

        const lobbyCode = lobbyCodeStore.lobbyCode
        const handshake: handshakeData = { intendedRole: role, lobbyCode: lobbyCode }
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