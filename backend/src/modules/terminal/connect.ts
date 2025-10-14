import type { Socket } from "socket.io"
import type { handshakeData } from "../../utils/types.ts"

import socketRegistryService from "../../services/socketRegistry.ts"
import lobbyService from "../../services/lobby.ts"

function connect(socket: Socket): number {
    const handshakeData = socket.data as handshakeData
    const terminalIdentifier = socketRegistryService.registerSocket(socket)

    // TODO: Add terminal to lobby
    
    return terminalIdentifier
}

export default { connect }