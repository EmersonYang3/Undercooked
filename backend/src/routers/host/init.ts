import socketRegistry from "services/socketRegistry"
import lobbyService from "services/lobby"
import sharedEnums from "shared/enums"

import events from "./events"
import hookEvents from "routers/shared/hookEvents"

import type { Socket } from "socket.io"

const serverToHostRemotes = sharedEnums.serverToHostRemotes

function initHostSocket(socket: Socket) {
    const socketConnection = socketRegistry.registerSocketConnection(socket)
    const lobbyCode = lobbyService.createLobby(socketConnection)

    socket.emit(serverToHostRemotes.lobbyStarted, { lobbyCode })
    hookEvents(socket, events)
}

export default { initHostSocket }