import type { uniqueIdentifier } from "shared/types"
import type { Socket } from "socket.io"

import socketRegistry from "services/socketRegistry"
import specialKey from "services/specialKey"    
import sharedEnums from "shared/enums"
import lobbyService from "services/lobby"

const serverToHostRemotes = sharedEnums.serverToHostRemotes
const serverToClientRemotes = sharedEnums.serverToClientRemotes

function onAcceptClient(hostSocket: Socket, identifier: uniqueIdentifier) {
    const clientConnection = socketRegistry.getSocketConnectionById(identifier)
    if (!clientConnection) { console.log("Client connection not found"); return }

    const isClientInLobby = lobbyService.isConnectionRegistered(clientConnection)
    if (isClientInLobby) { console.log("Client is already in the lobby"); return }

    const clientSpecialKey = specialKey.generateSpecialKey()
    specialKey.registerSocketConnection(clientConnection, clientSpecialKey)
    
    lobbyService.connectClientToLobby(clientConnection)
    hostSocket.emit(serverToHostRemotes.newClientJoined, identifier)
    clientConnection.socket.emit(serverToClientRemotes.clientAccepted, clientSpecialKey)
}

export default onAcceptClient