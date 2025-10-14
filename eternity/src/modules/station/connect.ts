import type { Socket } from "socket.io"
import type { handshakeData } from "shared/types"

import unqiService from "services/unqi"

function connect(socket: Socket): number {
    const handshakeData = socket.handshake.auth as handshakeData

    const stationIdentifier = unqiService.getUnqi()

    // TODO: Add station to lobby

    return stationIdentifier
}

export default connect
