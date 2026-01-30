import { defineStore } from "pinia"
import { io } from "socket.io-client"
import { handshakeData, intendedRoles } from "@shared/types"
import { useSocketStore } from "./SocketStore"
import { useLobbyCodeStore } from "./LobbyCode"
import { useClientStore } from "./Roles/ClientStore"
import { useStationStore } from "./Roles/StationStore"
import { useHostStore } from "./Roles/HostStore"

import router from '@/router'
import sharedEnums from "@shared/enums"

const gameRoles = sharedEnums.gameRoles

const serverPort = `:${sharedEnums.portServer.port}`
const sharedRemotes = sharedEnums.sharedRemotes

export const useJoiningStore = defineStore("joining", () => {
    function attemptJoinLobby(role: intendedRoles) {
        const lobbyCodeStore = useLobbyCodeStore()
        if (!lobbyCodeStore.isLobbyCodeValid()) { return }

        const lobbyCode = lobbyCodeStore.lobbyCode
        const handshake: handshakeData = { intendedRole: role, lobbyCode: lobbyCode }
        const clientSocket = io(serverPort, { auth: handshake })

        if (role === gameRoles.host) {
            useHostStore().initializePreconnections()
        } else if (role === gameRoles.client) {
            useClientStore().initializePreconnections()
        } else {
            useStationStore().initializePreconnections()
        }

        clientSocket.on(sharedRemotes.connectError, (errorMessage: Error) => {
            console.error("Connection error:", errorMessage)
        })
        const socketStore = useSocketStore();
        socketStore.setSocket(clientSocket);
        socketStore.setGameRole(role);
        const roleStore = getRoleStore(role);
        socketStore.bindInitEvents(roleStore);

        clientSocket.on(sharedRemotes.connect, () => {
            console.log("Successfully connected to server as", role)

            const socketStore = useSocketStore()
            socketStore.setSocket(clientSocket)
            socketStore.setGameRole(role)

            router.push(role == gameRoles.host ? "/hosting" : "/waiting")
        })
    }

    return { attemptJoinLobby }
})
