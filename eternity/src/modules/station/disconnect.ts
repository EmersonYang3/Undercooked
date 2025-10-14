import type { Socket } from "socket.io"

import unqiService from "services/unqi"

function disconnect(socket: Socket, reason: string): void {
    // TODO: Remove station from lobby and free unqi

    console.log("Station disconnected:", socket.id, "Reason:", reason)
}

export default disconnect
