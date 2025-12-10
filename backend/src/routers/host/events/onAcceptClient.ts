import type { uniqueIdentifier, playerData } from "shared/types"
import type { lobbyData, socketConnection } from "utils/types"
import type { Socket } from "socket.io"

import socketRegistry from "services/socketRegistry"
import specialKey from "services/specialKey"
import sharedEnums from "shared/enums"
import lobbyService from "services/lobby"

const serverToHostRemotes = sharedEnums.serverToHostRemotes
const serverToClientRemotes = sharedEnums.serverToClientRemotes

function pushClientToLobby(clientConnection: socketConnection, identifier: uniqueIdentifier) {
    lobbyService.transformLobbyData((lobbyData: lobbyData) => {
        const playerData: playerData = { currentPoints: 0, isHoldingPlate: false, currentlyHeldItem: null }
        lobbyData.clients.push(clientConnection)
        lobbyData.playerData[identifier] = playerData

        return lobbyData
    })
}

function onAcceptClient(hostSocket: Socket, identifier: uniqueIdentifier) {
    const clientConnection = socketRegistry.getSocketConnectionById(identifier)
    if (!clientConnection) { console.log("Client connection not found"); return }

    const isClientInLobby = lobbyService.isConnectionRegistered(clientConnection)
    if (isClientInLobby) { console.log("Client is already in the lobby"); return }

    const clientSpecialKey = specialKey.generateSpecialKey()
    specialKey.registerSocketConnection(clientConnection, clientSpecialKey)

    pushClientToLobby(clientConnection, identifier)

    hostSocket.emit(serverToHostRemotes.newClientJoined, identifier)
    clientConnection.socket.emit(serverToClientRemotes.clientAccepted, clientSpecialKey)
}

export default onAcceptClient