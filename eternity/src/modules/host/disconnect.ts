import type { Socket } from "socket.io"

import unqiService from "services/unqi"

function disconnect(socket: Socket, reason: string): void {
    // TODO: Remove host from lobby and cleanup

    console.log("Host disconnected:", socket.id, "Reason:", reason)
}

export default disconnect
