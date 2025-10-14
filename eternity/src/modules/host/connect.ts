import type { Socket } from "socket.io"
import type { handshakeData } from "shared/types"

import unqiService from "services/unqi"
import lobbyService from "services/lobby"

function connect(socket: Socket): { lobbyCode: string, hostIdentifier: number } {
    const handshakeData = socket.handshake.auth as handshakeData

    const hostIdentifier = unqiService.getUnqi()
    const lobbyCode = lobbyService.generateLobbyCode()

    // TODO: Create and store lobby data

    return { lobbyCode, hostIdentifier }
}

export default connect
