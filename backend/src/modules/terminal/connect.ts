import type { Socket } from "socket.io"
import type { handshakeData } from "../../utils/types.ts"

import socketRegistryService from "../../services/socketRegistry.ts"
import lobbyService from "../../services/lobby.ts"

function connect(socket: Socket) {
    const handshakeData = socket.data as handshakeData
    const terminalIdentifier = socketRegistryService.registerSocket(socket)

    
}

export default { connect }