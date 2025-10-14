import type { Socket } from "socket.io";

import socketRegistryService from "../../services/socketRegistry.ts"

function disconnected(socket: Socket, reason: string) { 
    socketRegistryService.removePlayer(socket, null)
}

export default { disconnected }
