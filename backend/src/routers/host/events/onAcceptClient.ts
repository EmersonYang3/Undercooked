import type { uniqueIdentifier } from "shared/types";
import type { Socket } from "socket.io";

import socketRegistry from "services/socketRegistry";
import lobbyService from "services/lobby"

function onAcceptClient(socket: Socket, identifier: uniqueIdentifier) {
    const clientConnection = socketRegistry.getSocketConnectionById(identifier)
    const isClientInLobby = lobbyService.isConnectionRegistered(clientConnection)

    console.log('Is client in lobby:', isClientInLobby)
}   

export default onAcceptClient