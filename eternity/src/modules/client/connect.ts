import type { Socket } from "socket.io"
import type { handshakeData } from "shared/types"

import unqiService from "services/unqi"
import specialKeyService from "services/specialKey"

function connect(socket: Socket): { lobbyCode: string, clientIdentifier: number, specialKey: string } {
    const handshakeData = socket.handshake.auth as handshakeData

    const clientIdentifier = unqiService.getUnqi()
    const specialKey = specialKeyService.generateSpecialKey()
    const lobbyCode = handshakeData.lobbyCode || ""

    // TODO: Add client to lobby

    return { lobbyCode, clientIdentifier, specialKey }
}

export default connect
