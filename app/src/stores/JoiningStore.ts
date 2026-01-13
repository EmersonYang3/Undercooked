import { defineStore } from "pinia"
import { io } from "socket.io-client"

import { handshakeData, intendedRoles } from "@shared/types"
import sharedEnums from "@shared/enums"

const serverPort = `:${sharedEnums.portServer.port}`
const sharedRemotes = sharedEnums.sharedRemotes

export const useJoiningStore = defineStore("joining", () => {
    function attemptJoinLobby(code: string, role: intendedRoles) {
        const handshake: handshakeData = { intendedRole: role, lobbyCode: code }
        const clientSocket = io(serverPort, { auth: handshake })

        clientSocket.on(sharedRemotes.connectError, (errorMessage: Error) => {
            console.error("Connection error:", errorMessage)
        })

        clientSocket.on(sharedRemotes.connect, () => {
            console.log("Successfully connected to server as", role)
        })
    }

    return { attemptJoinLobby }
})