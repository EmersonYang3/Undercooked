import type { Socket } from "socket.io"

import unqiService from "services/unqi"
import specialKeyService from "services/specialKey"

function disconnect(socket: Socket, reason: string): void {
    // TODO: Remove client from lobby, free unqi and special key

    console.log("Client disconnected:", socket.id, "Reason:", reason)
}

export default disconnect
