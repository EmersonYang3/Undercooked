import socketRegistry from "services/socketRegistry"
import lobbyService from "services/lobby"
import sharedEnums from "shared/enums"

import type { Socket } from "socket.io"

const serverToClientRemotes = sharedEnums.serverToClientRemotes
const serverToHostRemotes = sharedEnums.serverToHostRemotes

function initClientSocket(socket: Socket) {
    const socketConnection = socketRegistry.registerSocketConnection(socket)
    const currentLobbyData = lobbyService.getLobbyData()
    const hostSocket = currentLobbyData.host.socket

    hostSocket.emit(serverToHostRemotes.clientPendingJoin, { identifier: socketConnection.identifier })
    socket.emit(serverToClientRemotes.pendingJoin, { identifier: socketConnection.identifier })
}

export default { initClientSocket }