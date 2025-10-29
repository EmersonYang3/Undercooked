import type { uniqueIdentifier } from "shared/types"
import type { Socket } from "socket.io"

import socketRegistry from "services/socketRegistry"
import sharedEnums from "shared/enums"
import lobbyService from "services/lobby"

const serverToHostRemotes = sharedEnums.serverToHostRemotes
const serverToClientRemotes = sharedEnums.serverToClientRemotes

function onAcceptClient(socket: Socket, identifier: uniqueIdentifier) {
    const clientConnection = socketRegistry.getSocketConnectionById(identifier)
    if (!clientConnection) { return }

    const isClientInLobby = lobbyService.isConnectionRegistered(clientConnection)
    if (isClientInLobby) { return }
    
    lobbyService.connectClientToLobby(clientConnection)
    socket.emit(serverToHostRemotes.newClientJoined, identifier)
    clientConnection.socket.emit(serverToClientRemotes.clientAccepted)
}   

export default onAcceptClient