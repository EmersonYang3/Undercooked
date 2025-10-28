import type { uniqueIdentifier } from "shared/types";
import type { Socket } from "socket.io";

import socketRegistry from "services/socketRegistry";
import lobbyService from "services/lobby"

function onAcceptClient(socket: Socket, identifier: uniqueIdentifier) {
    const clientConnection = socketRegistry.getSocketConnectionById(identifier);
    const currentLobbyData = lobbyService.getLobbyData()

    const clients = currentLobbyData.clients || [];
    const isClientInLobby = clients.find(client => client.identifier === identifier);

    console.log('Host accepted client with identifier:', identifier);
    console.log('Client connection details:', clientConnection.socket.data);
    console.log('Client is in lobby:', isClientInLobby !== undefined);
}   

export default onAcceptClient