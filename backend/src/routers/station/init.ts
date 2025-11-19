import socketRegistry from "services/socketRegistry"
import lobbyService from "services/lobby"
import sharedEnums from "shared/enums"

import type { Socket } from "socket.io"

const serverTSRemotes = sharedEnums.serverToStationRemotes
const serverTHRemotes = sharedEnums.serverToHostRemotes

function initStationSocket(socket: Socket) {
    const socketConnection = socketRegistry.registerSocketConnection(socket)
    const currentLobbyData = lobbyService.getLobbyData()
    const hostSocket = currentLobbyData.host.socket

    hostSocket.emit(serverTHRemotes.stationPendingJoin, { identifier: socketConnection.identifier })
    socket.emit(serverTSRemotes.pendingJoin, { identifier: socketConnection.identifier })
}

export default { initStationSocket }